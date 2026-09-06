$sheetPath = 'temp_excel/xl/worksheets/sheet1.xml'
[xml]$sheet = Get-Content -Raw -Encoding UTF8 $sheetPath

Write-Output "--- MERGED CELLS ---"
if ($sheet.worksheet.mergeCells) {
    foreach ($m in $sheet.worksheet.mergeCells.mergeCell) {
        Write-Output "Merged: $($m.ref)"
    }
}

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

Write-Output "`n--- ALL CELLS WITH VALUES ---"
foreach ($row in $sheet.worksheet.sheetData.row) {
    $rNum = $row.r
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
            Write-Output "Row $rNum | Cell $($c.r) | Value: $val"
        }
    }
}
