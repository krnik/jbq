async function build(): Promise<void> {
    await import('./build');
    await import('./build_deno');
    await import('./add_examples_to_source');
    await import('./generate_readme');
}

build();
