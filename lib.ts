const capitalizeFirst = (str: string) => str
    .split("")
    .map((e, index) => index == 0 ? e.toUpperCase() : e)
    .join("")

export {
    capitalizeFirst
}

