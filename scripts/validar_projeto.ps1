param(
    [string]$RepoPath = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

function Fail([string]$Message) {
    Write-Host "ERRO  $Message" -ForegroundColor Red
    exit 1
}

function Ok([string]$Message) {
    Write-Host "OK    $Message" -ForegroundColor Green
}

$dataPath = Join-Path $RepoPath "data\imoveis.json"
$metaPath = Join-Path $RepoPath "data\meta.json"
$versionPath = Join-Path $RepoPath "version.json"
$indexPath = Join-Path $RepoPath "index.html"
$appPath = Join-Path $RepoPath "app.js"
$cssPath = Join-Path $RepoPath "styles.css"
$swPath = Join-Path $RepoPath "sw.js"

foreach ($path in @($dataPath,$metaPath,$versionPath,$indexPath,$appPath,$cssPath,$swPath)) {
    if (!(Test-Path $path)) { Fail "Arquivo ausente: $path" }
}

$items = Get-Content $dataPath -Raw -Encoding UTF8 | ConvertFrom-Json
$meta = Get-Content $metaPath -Raw -Encoding UTF8 | ConvertFrom-Json
$version = Get-Content $versionPath -Raw -Encoding UTF8 | ConvertFrom-Json

$count = @($items).Count
if ($count -ne [int]$meta.totalRegistros) {
    Fail "data/meta.json informa $($meta.totalRegistros), mas a base contém $count registros."
}
Ok "Quantidade da base alinhada: $count registros"

$duplicateIds = @($items | Group-Object id | Where-Object Count -gt 1)
if ($duplicateIds.Count -gt 0) { Fail "IDs duplicados encontrados." }
Ok "IDs sem duplicidade"

$duplicateUrls = @($items | Group-Object url | Where-Object { $_.Name -and $_.Count -gt 1 })
if ($duplicateUrls.Count -gt 0) { Fail "URLs duplicadas encontradas." }
Ok "URLs sem duplicidade"

$requiredFields = @("id","nome","cidade","regiao","fonte","url")
foreach ($item in $items) {
    foreach ($field in $requiredFields) {
        if ([string]::IsNullOrWhiteSpace([string]$item.$field)) {
            Fail "Campo obrigatório '$field' ausente no registro $($item.id)."
        }
    }
}
Ok "Campos essenciais presentes"

$dataRaw = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)
if ($dataRaw.Contains([string][char]0x2011)) {
    Fail "Foi encontrado hífen não separável (U+2011) em data/imoveis.json."
}
Ok "Hífens da base padronizados"

if ($version.version -ne $meta.versao) {
    Fail "version.json ($($version.version)) e data/meta.json ($($meta.versao)) estão desalinhados."
}
Ok "Versão alinhada: $($version.version)"

$index = Get-Content $indexPath -Raw -Encoding UTF8
if ($index -match 'styles-v9_1\.css') { Fail "index.html ainda referencia styles-v9_1.css." }
if ($index -notmatch 'styles\.css\?v=9\.2\.2') { Fail "index.html não referencia styles.css?v=9.2.2." }
if ($index -match 'city-buttons') { Fail "HTML ainda contém os botões antigos de cidade." }
if ($index -match 'searchHint|distanceNote') { Fail "HTML contém chave técnica de tradução visível." }
Ok "HTML consolidado"

if (Test-Path (Join-Path $RepoPath "styles-v9_1.css")) {
    Fail "styles-v9_1.css ainda existe."
}
Ok "CSS consolidado em um único arquivo"

$app = Get-Content $appPath -Raw -Encoding UTF8
if ($app -match 'searchHint\s*:') { Fail "app.js ainda contém a chave obsoleta searchHint." }
if ($app -notmatch "sortDistance\s*:") {
    Fail "Chave sortDistance não encontrada em app.js."
}
if (!$app.Contains('value="distance"') -and !$index.Contains('value="distance"')) {
    Fail "Opção de ordenação por distância não encontrada."
}
Ok "Busca e ordenação atualizadas"

$sw = Get-Content $swPath -Raw -Encoding UTF8
if ($sw -notmatch 'temporada-pb-v17-static') { Fail "Service Worker não está na geração v17." }
if ($sw -match 'styles-v9_1') { Fail "Service Worker ainda referencia CSS antigo." }
Ok "Service Worker atualizado"

if (Get-Command node -ErrorAction SilentlyContinue) {
    & node --check $appPath
    if ($LASTEXITCODE -ne 0) { Fail "app.js contém erro de sintaxe." }
    Ok "JavaScript válido"
} else {
    Write-Host "AVISO Node.js não encontrado; sintaxe de app.js não foi verificada pelo Node." -ForegroundColor Yellow
}

& git -C $RepoPath diff --check
if ($LASTEXITCODE -ne 0) { Fail "git diff --check encontrou problemas." }
Ok "git diff --check"

Write-Host ""
Write-Host "VALIDAÇÃO CONCLUÍDA COM SUCESSO" -ForegroundColor Green