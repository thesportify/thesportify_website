$ssPath = 'temp_excel/xl/sharedStrings.xml'
[xml]$ss = Get-Content -Raw -Encoding UTF8 $ssPath
$strings = @()
foreach ($si in $ss.sst.si) {
    if ($si.t) {
        if ($si.t -is [string]) { $strings += $si.t } else { $strings += $si.t.InnerText }
    } elseif ($si.r) {
        $t = ($si.r | ForEach-Object { if ($_.t -is [string]) { $_.t } else { $_.t.InnerText } }) -join ''
        $strings += $t
    } else {
        $strings += ''
    }
}

$sheets = Get-ChildItem 'temp_excel/xl/worksheets' -Filter '*.xml'
foreach ($sf in $sheets) {
    Write-Output "=== SHEET: $($sf.Name) ==="
    [xml]$sheet = Get-Content -Raw -Encoding UTF8 $sf.FullName
    foreach ($row in $sheet.worksheet.sheetData.row) {
        $rowCells = @()
        foreach ($c in $row.c) {
            $val = ''
            if ($c.v) {
                $val = $c.v
                if ($c.t -eq 's') {
                    $val = $strings[[int]$val]
                }
            } elseif ($c.is) {
                $val = $c.is.t
            }
            if ($val -ne '') {
                $rowCells += "$($c.r): $val"
            }
        }
        if ($rowCells.Count -gt 0) {
            Write-Output ($rowCells -join ' | ')
        }
    }
}
