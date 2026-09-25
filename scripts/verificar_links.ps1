param(
  [string]$RepoPath = "$HOME\Downloads\Temporada_PB_upload\Temporada_PB"
)

$ErrorActionPreference="Continue"

$dataPath=Join-Path $RepoPath "data\imoveis.json"
$reportPath=Join-Path $RepoPath "LINKS_A_REVISAR.md"

$items=Get-Content $dataPath -Raw -Encoding UTF8 | ConvertFrom-Json

$headers=@{
  "User-Agent"="Mozilla/5.0"
  "Accept-Language"="pt-BR,pt;q=0.9"
}

$rows=@()

foreach($item in $items){
  $status="OK"
  $code=""
  $obs=""

  try{
    $r=Invoke-WebRequest -Uri $item.url -Headers $headers -MaximumRedirection 8 -UseBasicParsing -TimeoutSec 20
    $code=$r.StatusCode

    if($r.StatusCode -ge 400){
      $status="REVISAR"
      $obs="Resposta HTTP $($r.StatusCode)"
    }
  }catch{
    $status="REVISAR"
    $obs=$_.Exception.Message
  }

  $rows += [pscustomobject]@{
    Nome=$item.nome
    Fonte=$item.fonte
    Status=$status
    HTTP=$code
    URL=$item.url
    Observacao=$obs
  }

  Write-Host ("{0,-8} {1}" -f $status,$item.nome)
}

$bad=$rows | Where-Object {$_.Status -eq "REVISAR"}

$md="# Verificação de links — Temporada PB`r`n`r`n"
$md+="Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm')`r`n`r`n"

if(!$bad){
  $md+="Nenhum link foi marcado para revisão.`r`n"
}else{
  $md+="| Hospedagem | Fonte | Situação | Observação |`r`n"
  $md+="|---|---|---|---|`r`n"

  foreach($r in $bad){
    $safeObs=($r.Observacao -replace '\|','/')
    $md+="| $($r.Nome) | $($r.Fonte) | REVISAR | $safeObs |`r`n"
  }
}

Set-Content $reportPath -Value $md -Encoding UTF8

Write-Host ""
Write-Host "Relatório salvo em: $reportPath" -ForegroundColor Cyan
