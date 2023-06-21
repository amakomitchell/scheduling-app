export const convertKelvinToCelsius = (kelvin: number | undefined) => {
    if(!kelvin) return ''
    return Math.round(kelvin - 273.15)
}