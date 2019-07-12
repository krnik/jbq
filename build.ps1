$loc = Get-Location;
$modules = [string]$loc + '/node_modules/.bin/'
$Env:Path += ";$modules";

eslint src/**/*.ts test/**/*.ts examples/**/*.ts --fix;

if ($?) {
    Write-Output '1) Running tests.';
    mocha --require ts-node/register --project ./tsconfig.build_cjs.json ./test/main.test.ts;
}

if ($?) {
    Write-Output '2) Validating examples.';
    node --require ts-node/register ./utils/run_examples.ts;
}

if ($?) {
    Write-Output '3) Generating docs.';
    typedoc --theme markdown --mode file --readme none --name JBQDocs  --out ./docs ./src;
}

if ($?) {
    Write-Output '4) Building files.';
    Remove-Item -Path './build' -Force -Recurse -ErrorAction Ignore;
    tsc -p ./tsconfig.build_esm.json;
    tsc -p ./tsconfig.build_cjs.json;
}

if ($?) {
    Write-Output '5) Finishing build + Deno build.';
    Remove-Item -Path './build_deno' -Force -Recurse -ErrorAction Ignore;
    node --require ts-node/register ./utils/build_all.ts;
}
