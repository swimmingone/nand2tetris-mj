val isMac: Boolean
    get() = org.gradle.internal.os.OperatingSystem.current().isMacOsX

object Libs {
    object Plugins {
        const val ktlint = "org.jlleitschuh.gradle.ktlint"
        const val ktlintIdea = "org.jlleitschuh.gradle.ktlint-idea"
    }

    object Versions {
        const val kotlin = "1.9.20"
        const val ktlint = "11.6.1"
        const val kotest = "5.8.0"
    }

    object Test {
        const val kotest = "io.kotest:kotest-runner-junit5:${Versions.kotest}"
        const val kotestAssertionsCore = "io.kotest:kotest-assertions-core:${Versions.kotest}"
        const val kotestProperty = "io.kotest:kotest-property:${Versions.kotest}"
    }
}
