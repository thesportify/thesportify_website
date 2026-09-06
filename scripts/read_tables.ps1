$tables = Get-ChildItem -Path 'temp_excel\xl\tables' -Filter '*.xml'
foreach ($t in $tables) {
    Write-Output "=== $($t.Name) ==="
    [xml]$xml = Get-Content -Raw -Encoding UTF8 $t.FullName
    Write-Output "Name: $($xml.table.name)"
    Write-Output "DisplayName: $($xml.table.displayName)"
    Write-Output "Ref: $($xml.table.ref)"
    Write-Output "HeaderRowCount: $($xml.table.headerRowCount)"
    foreach ($col in $xml.table.tableColumns.tableColumn) {
        Write-Output "  Col: $($col.name)"
    }
}
