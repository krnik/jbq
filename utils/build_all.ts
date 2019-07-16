async function build(): Promise<void> {
    await import('./build_esm_node');
    await import('./build_deno');
    await import('./add_examples_to_source');
    await import('./generate_readme');
}

build();
