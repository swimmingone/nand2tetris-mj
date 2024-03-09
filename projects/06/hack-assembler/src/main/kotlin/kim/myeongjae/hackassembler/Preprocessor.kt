package kim.myeongjae.hackassembler

fun preprocess(input: String): String {
    val lines = removeCommentsAndBlankLines(input.split(System.lineSeparator()))
    val (labelRemovedLines, labelMap) = createLabelMap(lines)
    val symbolRemovedLines = replacePredefinedSymbols(labelRemovedLines)

    return replaceLabelWithLineNumber(
        symbolRemovedLines,
        labelMap
    ).joinToString(System.lineSeparator())
}

private tailrec fun removeCommentsAndBlankLines(input: List<String>, result: List<String> = listOf()): List<String> {
    if (input.isEmpty()) {
        return result;
    }

    val head = input.first().trim()
    val tail = input.drop(1)

    return when {
        head.isBlank() -> removeCommentsAndBlankLines(tail, result)
        head.startsWith("//") -> removeCommentsAndBlankLines(tail, result)
        else -> {
            removeCommentsAndBlankLines(tail, result + head)
        }
    }
}

private tailrec fun createLabelMap(
    input: List<String>,
    labelRemovedLines: List<String> = listOf(),
    lineNumber: Int = 0,
    labelMap: Map<String, Int> = mapOf()
): Pair<List<String>, Map<String, Int>> {
    if (input.isEmpty()) {
        return Pair(labelRemovedLines, labelMap);
    }

    val head = input.first()
    val tail = input.drop(1)

    return when {
        head.startsWith("(") -> {
            val label = head.substring(1, head.length - 1)
            createLabelMap(tail, labelRemovedLines, lineNumber, labelMap + (label to lineNumber))
        }

        else -> {
            createLabelMap(tail, labelRemovedLines + head, lineNumber + 1, labelMap)
        }
    }
}


private tailrec fun replaceLabelWithLineNumber(
    symbolAndLabelRemovedLines: List<String>,
    labelMap: Map<String, Int>,
    result: List<String> = listOf()
): List<String> {
    if (symbolAndLabelRemovedLines.isEmpty()) {
        return result;
    }

    val head = symbolAndLabelRemovedLines.first()
    val tail = symbolAndLabelRemovedLines.drop(1)

    return when {
        head.isAInstruction() -> {
            val label = head.substring(1)
            val lineNumber = labelMap[label] ?: label.toInt()
            replaceLabelWithLineNumber(tail, labelMap, result + "@$lineNumber")
        }

        else -> {
            replaceLabelWithLineNumber(tail, labelMap, result + head)
        }
    }
}

private tailrec fun replacePredefinedSymbols(
    input: List<String>,
    result: List<String> = listOf()
): List<String> {
    if (input.isEmpty()) {
        return result;
    }

    val head = input.first()
    val tail = input.drop(1)

    return when {
        head.startsWith("@") -> {
            val predefinedSymbol = when (val symbol = head.substring(1)) {
                "SP" -> "0"
                "LCL" -> "1"
                "ARG" -> "2"
                "THIS" -> "3"
                "THAT" -> "4"
                "R0" -> "0"
                "R1" -> "1"
                "R2" -> "2"
                "R3" -> "3"
                "R4" -> "4"
                "R5" -> "5"
                "R6" -> "6"
                "R7" -> "7"
                "R8" -> "8"
                "R9" -> "9"
                "R10" -> "10"
                "R11" -> "11"
                "R12" -> "12"
                "R13" -> "13"
                "R14" -> "14"
                "R15" -> "15"
                "SCREEN" -> "16384"
                "KBD" -> "24576"
                else -> symbol
            }
            replacePredefinedSymbols(tail, result + "@$predefinedSymbol")
        }

        else -> {
            replacePredefinedSymbols(tail, result + head)
        }
    }
}
