package kim.myeongjae.hackassembler


fun assemble(input: String): String {
    return assemble(preprocess(input).split(System.lineSeparator())).joinToString(System.lineSeparator())
}

private tailrec fun assemble(input: List<String>, result: List<String> = listOf()): List<String> {
    if (input.isEmpty()) {
        return result
    }

    val head = input.first().trim()
    val tail = input.drop(1)

    val assembled = when {
        head.isAInstruction() -> assembleAInstruction(head)
        else -> assembleCInstruction(head)
    }

    return assemble(tail, result + assembled)
}
