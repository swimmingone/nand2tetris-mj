package kim.myeongjae.hackassembler


fun assemble(input:String): String {
    return assemble(input.split(System.lineSeparator())).joinToString(System.lineSeparator())
}

private tailrec fun assemble(input: List<String>, result: List<String> = listOf()): List<String> {
    if (input.isEmpty()) {
        return result
    }

    val head = input.first().trim()
    val tail = input.drop(1)

    // TODO: 전처리작업 없애기. preprocessor에서 하므로
    return when{
        head.isBlank() -> return assemble(tail, result)
        head.startsWith("//") -> return assemble(tail, result)
        else -> {
            val assembled = when {
                head.isAInstruction() -> assembleAInstruction(head)
                else -> assembleCInstruction(head)
            }
            assemble(tail, result + assembled)
        }
    }
}
