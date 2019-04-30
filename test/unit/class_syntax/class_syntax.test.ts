import { expect } from 'chai';
import {
    array,
    collection,
    instantiate,
    object,
    optional,
    regex,
    shape,
    string,
    transform,
    Validator,
    withDefault,
    Shape,
    number,
    value,
    multipleOf,
    len,
} from '../../../src/class_syntax';
import { compileClass } from '../../../src/class_syntax/build_method_compile';
import { check, property, gen, Generator } from 'testcheck';
import { Option } from '../../../src/misc/typings';

describe('Class Syntax', (): void => {
    it('simple', (): void => {
        class Address extends Validator {
            @string
            public zip!: string;

            @string
            @optional
            public street!: string;
            public constructed = true;
            public hasMethod(): true {
                return true;
            }
        }
        compileClass(Address);

        const validObject = gen.object({
            zip: gen.string,
            street: gen.oneOf<unknown>([gen.undefined, gen.string]),
        });

        check(
            property(
                validObject,
                (data): void => {
                    const instance = new Address().build(data);

                    expect(instance.constructed).to.be.equal(true);
                    expect(instance.hasMethod()).to.be.equal(true);

                    for (const key in data)
                        expect(instance[key as keyof Address]).to.be.equal(data[key]);
                },
            ),
        );

        const invalidObject = gen.object({
            zip: gen.string,
            street: gen.number,
        });

        check(
            property(
                invalidObject,
                (data): void => {
                    expect((): Address => new Address().build(data)).to.throw();
                },
            ),
        );
    });

    it('simple with defaults', (): void => {
        class Address extends Validator {
            @string
            @optional
            @withDefault((data: Shape<Address>): string => data.address.split('@', 2)[0])
            public zip!: string;

            @string
            @regex(/^\d{1,3}@\.+$/)
            public address!: string;
        }

        compileClass(Address);

        const validObject = gen.object({
            address: gen.string,
        });

        check(
            property(
                gen.intWithin(0, 100),
                validObject,
                (zip, data): void => {
                    data.address = `${zip}@${data.address}`;

                    const instance = new Address().build(data);
                    expect(instance.zip).to.be.equal(zip.toString());
                },
            ),
        );

        const invalidObject = gen.object({
            address: gen.JSONPrimitive,
            zip: gen.oneOf<unknown>([gen.undefined, gen.number]),
        });

        check(
            property(
                invalidObject,
                (data): void => {
                    expect((): Address => new Address().build(data)).to.throw();
                },
            ),
        );
    });

    it('simple with transforms', (): void => {
        @number
        class Building {}

        class Address extends Validator {
            @string
            @transform((p: string): string => p.toUpperCase())
            public street!: string;

            @array
            @collection(Building)
            @transform((buildings: number[]): number[] => buildings.map((n): number => n - 100))
            public buildings!: number[];

            @transform(
                (_, data: Shape<Address>): boolean[] => data.buildings.map((n): boolean => n > 100),
            )
            public bools!: boolean[];
        }

        compileClass(Address);

        check(
            property(
                gen.string,
                gen.array(gen.number, { size: 10 }),
                (street, buildings): void => {
                    const instance = new Address().build({ street, buildings });
                    expect(street.toUpperCase()).to.be.equal(instance.street);
                    for (const [index, buildingNo] of buildings.entries()) {
                        expect(buildingNo - 100).to.be.equal(instance.buildings[index]);
                        expect(buildingNo > 100).to.be.equal(instance.bools[index]);
                    }
                },
            ),
        );

        check(
            property(
                gen.string,
                gen.array(gen.string, { size: 10 }),
                (street, buildings): void => {
                    expect((): Address => new Address().build({ street, buildings })).to.throw();
                },
            ),
        );
    });

    it('composed', (): void => {
        class Address extends Validator {
            @number
            @value({ min: 10, max: { $dataPath: 'max' } })
            public zip!: number;
        }

        compileClass(Address);

        @instantiate
        class ID {
            @number
            public value!: number;

            public findUser(this: ID): Option<number> {
                return this.value > 100 ? undefined : this.value;
            }
        }

        compileClass(ID);

        class User extends Validator {
            @object
            @shape(Address)
            public addres!: Shape<Address>;

            @shape(ID)
            public id!: ID;
        }

        compileClass(User);

        const max = 1000;
        check(
            property(
                gen.numberWithin(0, max),
                (num): void => {
                    const userData = {
                        address: {
                            max,
                            zip: num,
                        },
                        id: {
                            value: num,
                        },
                    };

                    const userInstance = new User().build(userData);
                    expect(userInstance.addres).to.not.be.instanceOf(Address);
                    expect(userInstance.addres)
                        .to.be.an('object')
                        .that.have.all.keys(['zip']);
                    expect(userInstance.addres.zip).to.be.equal(num);

                    expect(userInstance.id).to.be.instanceOf(ID);
                    expect(userInstance.id.findUser()).to.be.equal(num > 100 ? undefined : num);

                    const addressData = { zip: num, max: max / 2 };
                    if (num > max / 2) {
                        expect((): Address => new Address().build(addressData)).to.throw();
                    } else {
                        const addresInstance = new Address().build(addressData);
                        expect(addresInstance.zip).to.be.equal(num);
                    }
                },
            ),
        );
    });

    it('composed with defaults', (): void => {
        class Address extends Validator {
            @number
            @value({ min: 10, max: { $dataPath: 'max' } })
            public zip!: number;
        }

        compileClass(Address);

        @instantiate
        @optional
        class ID extends Validator {
            @number
            @optional
            @withDefault((): number => 1)
            public value!: number;
        }

        compileClass(ID);

        class User extends Validator {
            @object
            @optional
            @shape(Address)
            public address!: Option<Shape<Address>>;

            @shape(ID)
            public id!: ID;
        }

        compileClass(User);

        const optionalNumber = gen.oneOf<unknown>([gen.number, gen.undefined]) as Generator<
            Option<number>
        >;
        check(
            property(
                optionalNumber,
                (num): void => {
                    if (num !== undefined) {
                        if (num < 10) {
                            expect((): Address => new Address().build({ zip: num })).to.throw();
                        } else {
                            const addresInstance = new Address().build({ zip: num });
                            expect(addresInstance.zip).to.be.equal(num);
                            expect(
                                (): Address => new Address().build({ zip: num, max: num - 1 }),
                            ).to.throw();
                        }
                        return;
                    }

                    const idInstance1 = new ID().build({ value: num });
                    expect(idInstance1.value).to.be.equal(1);

                    const idInstance2 = new ID().build(undefined);
                    expect(idInstance2.value).to.be.equal(1);

                    const userInstance = new User().build({});
                    expect(userInstance.address).to.be.equal(undefined);
                    expect(userInstance.id).to.be.instanceOf(ID);
                    expect(userInstance.id.value).to.be.equal(1);
                },
            ),
        );
    });

    it('composed with transforms', (): void => {
        @number
        @multipleOf(1)
        class Timestamp {}

        @instantiate
        class Check {
            private checked: boolean = false;

            public isChecked(): boolean {
                return this.checked;
            }

            public markChecked(): void {
                this.checked = true;
            }
        }

        compileClass(Check);

        class Dates extends Validator {
            @array
            @collection(Timestamp)
            @transform((timestamp: number): Date => new Date(timestamp))
            public dates!: Date[];

            @array
            @collection(Check)
            @transform(
                (checks: Check[]): Check[] =>
                    checks.map(
                        (check): Check => {
                            expect(check.isChecked()).to.be.equal(false);
                            check.markChecked();
                            return check;
                        },
                    ),
            )
            public checks!: Check[];
        }

        compileClass(Dates);

        const timestampGen = gen.array(gen.intWithin(Date.now() - Date.now() * 0.7, Date.now()));
        check(
            property(
                timestampGen,
                (stamp): void => {
                    const instance = new Dates().build({ dates: stamp, checks: stamp });
                    expect(instance.dates)
                        .to.be.an('array')
                        .that.have.lengthOf(stamp.length);
                    for (const date of instance.dates) expect(date).to.be.instanceOf(Date);
                    for (const check of instance.checks) {
                        expect(check).to.be.instanceOf(Check);
                        expect(check.isChecked()).to.be.equal(true);
                    }
                },
            ),
        );
    });

    it('composed async', async (): Promise<void> => {
        @string
        @regex(/^\d{4}-\d{2}-\d{2}$/)
        class DateString {}

        @optional
        @instantiate
        class SmartName {
            @withDefault((): string => 'John')
            public first!: string;

            @withDefault((): string => 'Doe')
            @transform(async (v: string): Promise<string> => v.toUpperCase())
            public last!: string;
        }

        compileClass(SmartName);

        class Address extends Validator {
            @string
            @len(4)
            @optional
            public zip?: string;
        }

        compileClass(Address);

        check(
            property(
                gen.int,
                (zip): void => {
                    if (zip.toString().length === 4) {
                        const addressInstance = new Address().build({ zip });
                        expect(addressInstance.zip).to.be.equal(zip);
                    } else {
                        expect((): Address => new Address().build({ zip })).to.throw();
                    }
                },
            ),
        );

        @instantiate
        class User extends Validator {
            @string
            @optional
            public id!: string;

            @array
            @collection(DateString)
            public dates!: string[];

            @shape(SmartName)
            public name!: SmartName;

            @array
            @collection(SmartName)
            public names!: SmartName[];

            @object
            @optional
            @shape(Address)
            public address?: Address;
        }

        compileClass(User);

        const idGen = gen.oneOf<unknown>([gen.undefined, gen.string]);
        const addressGen = gen.oneOf<unknown>([
            gen.undefined,
            gen.object({
                zip: gen.oneOf<unknown>([gen.undefined, gen.alphaNumChar]),
            }),
        ]);

        check(
            property(
                idGen,
                addressGen,
                (id, address): void => {
                    const instance = new User().build({
                        id,
                        address,
                        names: new Array(10),
                        dates: ['2000-20-20'],
                    });
                    expect(instance.id).to.be.equal(id);
                    if (address === undefined) {
                        expect(instance.address).to.be.equal(address);
                    }
                    if (typeof address === 'object' && address !== null) {
                        const zip = (address as Shape<Address>).zip;
                        expect((instance.address as Shape<Address>).zip).to.be.equal(zip);
                    }
                    expect(instance.name).to.be.instanceOf(Promise);
                    expect(instance.names).to.be.an('array');
                    for (const name of instance.names) expect(name).to.be.instanceOf(Promise);
                },
            ),
        );

        const instance = await new User().build({
            dates: ['1222-12-12'],
            names: new Array(10),
            address: { zip: '1234' },
        });

        expect(instance.id).to.be.equal(undefined);
        expect(instance.name).to.be.instanceOf(SmartName);
        expect(instance.address)
            .to.be.an('object')
            .that.have.property('zip', '1234');
        expect(instance.names).to.be.an('array');
        for (const name of instance.names) expect(name).to.be.instanceOf(SmartName);
    });
});
