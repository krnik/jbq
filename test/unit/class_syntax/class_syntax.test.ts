import { expect } from 'chai';
import { check, gen, Generator, property } from 'testcheck';
import {
    array,
    collectionOf,
    compile,
    every,
    len,
    number,
    object,
    optional,
    regex,
    shape,
    string,
    transform,
    Validator,
    value,
    withDefault,
} from '../../../src/class_syntax';
import { Option } from '../../../src/misc/typings';

describe('Class Syntax', (): void => {
    it('simple', (): void => {
        @compile()
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

        const validObject = gen.object({
            zip: gen.string,
            street: gen.oneOf<unknown>([gen.undefined, gen.string]),
        });

        check(
            property(
                validObject,
                (data): void => {
                    const instance = new Address().from(data);

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
                    expect((): Address => new Address().from(data)).to.throw();
                },
            ),
        );
    }).timeout(5000);

    it('simple with defaults', (): void => {
        @compile()
        class Address extends Validator {
            @string
            @optional
            @withDefault((data: Address): string => data.address.split('@', 2)[0])
            public zip!: string;

            @string
            @regex(/^\d{1,3}@\.+$/)
            public address!: string;
        }

        const validObject = gen.object({
            address: gen.string,
        });

        check(
            property(
                gen.intWithin(0, 100),
                validObject,
                (zip, data): void => {
                    data.address = `${zip}@${data.address}`;

                    const instance = new Address().from(data);
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
                    expect((): Address => new Address().from(data)).to.throw();
                },
            ),
        );
    }).timeout(5000);

    it('simple with transforms', (): void => {
        @compile()
        class Address extends Validator {
            @string
            @transform((street: string): string => street.toUpperCase())
            public street!: string;

            @array
            @transform((buildings: number[]): number[] => buildings.map((n): number => n - 100))
            public buildings!: number[];

            @transform((_, data: Address): boolean[] => data.buildings.map((n): boolean => n > 100))
            public bools!: boolean[];
        }

        check(
            property(
                gen.string,
                gen.array(gen.number, { size: 10 }),
                (street, buildings): void => {
                    const instance = new Address().from({ street, buildings });
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
                    expect((): Address => new Address().from({ street, buildings })).to.throw();
                },
            ),
        );
    }).timeout(5000);

    it('composed', (): void => {
        @compile()
        class Address extends Validator {
            @number
            @value({ min: 10, max: { $dataPath: 'max' } })
            public zip!: number;
        }

        @compile()
        class ID {
            @number
            public value!: number;

            public findUser(this: ID): Option<number> {
                return this.value > 100 ? undefined : this.value;
            }
        }

        @compile()
        class User extends Validator {
            @object
            @shape(Address)
            public addres!: Address;

            @shape(ID)
            public id!: ID;
        }

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

                    const userInstance = new User().from(userData);
                    expect(userInstance.addres).to.not.be.instanceOf(Address);
                    expect(userInstance.addres)
                        .to.be.an('object')
                        .that.have.all.keys(['zip']);
                    expect(userInstance.addres.zip).to.be.equal(num);

                    expect(userInstance.id).to.be.instanceOf(ID);
                    expect(userInstance.id.findUser()).to.be.equal(num > 100 ? undefined : num);

                    const addressData = { zip: num, max: max / 2 };
                    if (num > max / 2) {
                        expect((): Address => new Address().from(addressData)).to.throw();
                    } else {
                        const addresInstance = new Address().from(addressData);
                        expect(addresInstance.zip).to.be.equal(num);
                    }
                },
            ),
        );
    }).timeout(5000);

    it('composed with defaults', (): void => {
        @compile()
        class Address extends Validator {
            @number
            @value({ min: 10, max: { $dataPath: 'max' } })
            public zip!: number;
        }

        @compile()
        class ID extends Validator {
            @number
            @optional
            @withDefault((): number => 1)
            public value!: number;
        }

        @compile()
        class User extends Validator {
            @object
            @optional
            @shape(Address)
            public address!: Option<Address>;

            @shape(ID)
            public id!: ID;
        }

        const optionalNumber = gen.oneOf<unknown>([gen.number, gen.undefined]) as Generator<
            Option<number>
        >;
        check(
            property(
                optionalNumber,
                (num): void => {
                    if (num !== undefined) {
                        if (num < 10) {
                            expect((): Address => new Address().from({ zip: num })).to.throw();
                        } else {
                            const addresInstance = new Address().from({ zip: num });
                            expect(addresInstance.zip).to.be.equal(num);
                            expect(
                                (): Address => new Address().from({ zip: num, max: num - 1 }),
                            ).to.throw();
                        }
                        return;
                    }

                    const idInstance1 = new ID().from({ value: num });
                    expect(idInstance1.value).to.be.equal(1);

                    const idInstance2 = new ID().from(undefined);
                    expect(idInstance2.value).to.be.equal(1);

                    const userInstance = new User().from({});
                    expect(userInstance.address).to.be.equal(undefined);
                    expect(userInstance.id).to.be.instanceOf(ID);
                    expect(userInstance.id.value).to.be.equal(1);
                },
            ),
        );
    }).timeout(5000);

    it('composed with transforms', (): void => {
        @compile()
        class Check {
            private checked: boolean = false;

            public isChecked(): boolean {
                return this.checked;
            }

            public markChecked(): void {
                this.checked = true;
            }
        }

        @compile()
        class Dates extends Validator {
            @array
            @transform((timestamp: number): Date => new Date(timestamp))
            public dates!: Date[];

            @array
            @collectionOf(Check)
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

        const timestampGen = gen.array(gen.intWithin(Date.now() - Date.now() * 0.7, Date.now()));
        check(
            property(
                timestampGen,
                (stamp): void => {
                    const instance = new Dates().from({ dates: stamp, checks: stamp });
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
    }).timeout(5000);

    it('composed async', async (): Promise<void> => {
        @compile()
        class SmartName {
            @string
            @optional
            @withDefault((): string => 'John')
            public first!: string;

            @string
            @optional
            @withDefault((): string => 'Doe')
            @transform(async (v: string): Promise<string> => v.toUpperCase())
            public last!: string;
        }

        @compile()
        class Address extends Validator {
            @string
            @len(4)
            @optional
            public zip?: string;
        }

        check(
            property(
                gen.int,
                (zip): void => {
                    if (zip.toString().length === 4) {
                        const addressInstance = new Address().from({ zip });
                        expect(addressInstance.zip).to.be.equal(zip);
                    } else {
                        expect((): Address => new Address().from({ zip })).to.throw();
                    }
                },
            ),
        );

        @compile()
        class User extends Validator {
            @string
            @optional
            public id!: string;

            @array
            @every((element): boolean => typeof element === 'string')
            public dates!: string[];

            @shape(SmartName)
            public name!: SmartName;

            @array
            @collectionOf(SmartName)
            public names!: SmartName[];

            @object
            @optional
            @shape(Address)
            public address?: Address;
        }

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
                    const instance = new User().from({
                        id,
                        address,
                        names: new Array(10).fill(0).map((): object => ({})),
                        dates: ['2000-20-20'],
                        name: {},
                    });
                    expect(instance.id).to.be.equal(id);
                    if (address === undefined) {
                        expect(instance.address).to.be.equal(address);
                    }
                    if (typeof address === 'object' && address !== null) {
                        const zip = (address as Address).zip;
                        expect((instance.address as Address).zip).to.be.equal(zip);
                    }
                    expect(instance.name).to.be.instanceOf(Promise);
                    expect(instance.names).to.be.an('array');
                    for (const name of instance.names) expect(name).to.be.instanceOf(Promise);
                },
            ),
        );

        const instance = await new User().from({
            dates: ['1222-12-12'],
            names: new Array(10).fill(0).map((): object => ({})),
            name: {},
            address: { zip: '1234' },
        });

        expect(instance.id).to.be.equal(undefined);
        expect(instance.name).to.be.instanceOf(SmartName);
        expect(instance.address)
            .to.be.an('object')
            .that.have.property('zip', '1234');
        expect(instance.names).to.be.an('array');
        for (const name of instance.names) expect(name).to.be.instanceOf(SmartName);
    }).timeout(5000);
});
