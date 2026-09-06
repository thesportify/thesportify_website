$files = Get-ChildItem -Path 'temp_excel' -Recurse
foreach ($f in $files) {
    Write-Output "$($f.FullName)"
}
