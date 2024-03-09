plugins {
    kotlin("jvm") version "1.9.21"

    id(Libs.Plugins.ktlint) version Libs.Versions.ktlint
    id(Libs.Plugins.ktlintIdea) version Libs.Versions.ktlint
}

group = "kim.myeongjae"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.jetbrains.kotlin:kotlin-test")

    testImplementation(Libs.Test.kotest)
    testImplementation(Libs.Test.kotestAssertionsCore)
    testImplementation(Libs.Test.kotestProperty)
}

tasks.test {
    useJUnitPlatform()
}
kotlin {
    jvmToolchain(17)
}
