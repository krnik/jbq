You can also use class decorators to create classes with schemas attached to them.
Every keyword has its decorator. You can read more in the docs.

Of course you need to use `compileClass` function to build the custom `build` method due to performance reasons. The `build` method could be compiled on first evaluation of the `build` method but that's one of the possibilities for the future.

The reason behind using `build` method is that it's more flexible to change a method than change a constructor of a class.

{{example('class_syntax')}}
