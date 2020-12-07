// flow-typed signature: e47d7c3f1000ba6b5ce70c188928d99e
// flow-typed version: <<STUB>>/chalk_v4.1.0/flow_v0.112.0

declare module "chalk" {
  declare type ForegroundColor =
    | "black"
    | "red"
    | "green"
    | "yellow"
    | "blue"
    | "magenta"
    | "cyan"
    | "white"
    | "gray"
    | "grey"
    | "blackBright"
    | "redBright"
    | "greenBright"
    | "yellowBright"
    | "blueBright"
    | "magentaBright"
    | "cyanBright"
    | "whiteBright";

  /**
   * Basic background colors.
   *
   * [More colors here.](https://github.com/chalk/chalk/blob/master/readme.md#256-and-truecolor-color-support)
   */
  declare type BackgroundColor =
    | "bgBlack"
    | "bgRed"
    | "bgGreen"
    | "bgYellow"
    | "bgBlue"
    | "bgMagenta"
    | "bgCyan"
    | "bgWhite"
    | "bgGray"
    | "bgGrey"
    | "bgBlackBright"
    | "bgRedBright"
    | "bgGreenBright"
    | "bgYellowBright"
    | "bgBlueBright"
    | "bgMagentaBright"
    | "bgCyanBright"
    | "bgWhiteBright";

  /**
   * Basic colors.
   *
   * [More colors here.](https://github.com/chalk/chalk/blob/master/readme.md#256-and-truecolor-color-support)
   */
  declare type Color = ForegroundColor | BackgroundColor;
  declare type Modifiers =
    | "reset"
    | "bold"
    | "dim"
    | "italic"
    | "underline"
    | "inverse"
    | "hidden"
    | "strikethrough"
    | "visible";

  /**
   * Levels:
   * - `0` - All colors disabled.
   * - `1` - Basic 16 colors support.
   * - `2` - ANSI 256 colors support.
   * - `3` - Truecolor 16 million colors support.
   */
  declare type chalk$Level = 0 | 1 | 2 | 3;

  declare interface chalk$Options {
    /**
     * Specify the color support for Chalk.
     *
     * By default, color support is automatically detected based on the environment.
     *
     * Levels:
     * - `0` - All colors disabled.
     * - `1` - Basic 16 colors support.
     * - `2` - ANSI 256 colors support.
     * - `3` - Truecolor 16 million colors support.
     */
    level?: chalk$Level;
  }

  /**
   * Return a new Chalk instance.
   */
  declare type chalk$Instance = (options?: chalk$Options) => chalk$Chalk;

  /**
   * Detect whether the terminal supports color.
   */
  declare interface chalk$ColorSupport {
    /**
     * The color level used by Chalk.
     */
    level: chalk$Level;

    /**
     * Return whether Chalk supports basic 16 colors.
     */
    hasBasic: boolean;

    /**
     * Return whether Chalk supports ANSI 256 colors.
     */
    has256: boolean;

    /**
     * Return whether Chalk supports Truecolor 16 million colors.
     */
    has16m: boolean;
  }

  declare interface chalk$ChalkFunction {
    /**
     * Use a template string.
     * @remarks Template literals are unsupported for nested calls (see [issue #341](https://github.com/chalk/chalk/issues/341))
     * @example ```
     * import chalk = require('chalk');
     *
     * log(chalk`
     * CPU: {red ${cpu.totalPercent}%}
     * RAM: {green ${ram.used / ram.total * 100}%}
     * DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
     * `);
     * ```
     * @example ```
     * import chalk = require('chalk');
     *
     * log(chalk.red.bgBlack`2 + 3 = {bold ${2 + 3}}`)
     * ```
     */
    (text: TemplateStringsArray, ...placeholders: mixed[]): string;
    (...text: mixed[]): string;
  }

  declare type chalk$Chalk = {
    /**
     * Return a new Chalk instance.
     */
    Instance: chalk$Instance,

    /**
     * The color support for Chalk.
     *
     * By default, color support is automatically detected based on the environment.
     *
     * Levels:
     * - `0` - All colors disabled.
     * - `1` - Basic 16 colors support.
     * - `2` - ANSI 256 colors support.
     * - `3` - Truecolor 16 million colors support.
     */
    level: chalk$Level,

    /**
     * Use HEX value to set text color.
     * @param color - Hexadecimal value representing the desired color.
     * @example ```
     * import chalk = require('chalk');
     *
     * chalk.hex('#DEADED');
     * ```
     */
    hex: (color: string) => chalk$Chalk,

    /**
     * Use keyword color value to set text color.
     * @param color - Keyword value representing the desired color.
     * @example ```
     * import chalk = require('chalk');
     *
     * chalk.keyword('orange');
     * ```
     */
    keyword: (color: string) => chalk$Chalk,

    /**
     * Use RGB values to set text color.
     */
    rgb: (red: number, green: number, blue: number) => chalk$Chalk,

    /**
     * Use HSL values to set text color.
     */
    hsl: (hue: number, saturation: number, lightness: number) => chalk$Chalk,

    /**
     * Use HSV values to set text color.
     */
    hsv: (hue: number, saturation: number, value: number) => chalk$Chalk,

    /**
     * Use HWB values to set text color.
     */
    hwb: (hue: number, whiteness: number, blackness: number) => chalk$Chalk,

    /**
     * Use a [Select/Set Graphic Rendition](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters) (SGR) [color code number](https://en.wikipedia.org/wiki/ANSI_escape_code#3/4_bit) to set text color.
     *
     * 30 <= code && code < 38 || 90 <= code && code < 98
     * For example, 31 for red, 91 for redBright.
     */
    ansi: (code: number) => chalk$Chalk,

    /**
     * Use a [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set text color.
     */
    ansi256: (index: number) => chalk$Chalk,

    /**
     * Use HEX value to set background color.
     * @param color - Hexadecimal value representing the desired color.
     * @example ```
     * import chalk = require('chalk');
     *
     * chalk.bgHex('#DEADED');
     * ```
     */
    bgHex: (color: string) => chalk$Chalk,

    /**
     * Use keyword color value to set background color.
     * @param color - Keyword value representing the desired color.
     * @example ```
     * import chalk = require('chalk');
     *
     * chalk.bgKeyword('orange');
     * ```
     */
    bgKeyword: (color: string) => chalk$Chalk,

    /**
     * Use RGB values to set background color.
     */
    bgRgb: (red: number, green: number, blue: number) => chalk$Chalk,

    /**
     * Use HSL values to set background color.
     */
    bgHsl: (hue: number, saturation: number, lightness: number) => chalk$Chalk,

    /**
     * Use HSV values to set background color.
     */
    bgHsv: (hue: number, saturation: number, value: number) => chalk$Chalk,

    /**
     * Use HWB values to set background color.
     */
    bgHwb: (hue: number, whiteness: number, blackness: number) => chalk$Chalk,

    /**
     * Use a [Select/Set Graphic Rendition](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_parameters) (SGR) [color code number](https://en.wikipedia.org/wiki/ANSI_escape_code#3/4_bit) to set background color.
     *
     * 30 <= code && code < 38 || 90 <= code && code < 98
     * For example, 31 for red, 91 for redBright.
     * Use the foreground code, not the background code (for example, not 41, nor 101).
     */
    bgAnsi: (code: number) => chalk$Chalk,

    /**
     * Use a [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set background color.
     */
    bgAnsi256: (index: number) => chalk$Chalk,

    /**
     * Modifier: Resets the current color chain.
     */
    +reset: chalk$Chalk,

    /**
     * Modifier: Make text bold.
     */
    +bold: chalk$Chalk,

    /**
     * Modifier: Emitting only a small amount of light.
     */
    +dim: chalk$Chalk,

    /**
     * Modifier: Make text italic. (Not widely supported)
     */
    +italic: chalk$Chalk,

    /**
     * Modifier: Make text underline. (Not widely supported)
     */
    +underline: chalk$Chalk,

    /**
     * Modifier: Inverse background and foreground colors.
     */
    +inverse: chalk$Chalk,

    /**
     * Modifier: Prints the text, but makes it invisible.
     */
    +hidden: chalk$Chalk,

    /**
     * Modifier: Puts a horizontal line through the center of the text. (Not widely supported)
     */
    +strikethrough: chalk$Chalk,

    /**
     * Modifier: Prints the text only when Chalk has a color support level > 0.
     * Can be useful for things that are purely cosmetic.
     */
    +visible: chalk$Chalk,
    +black: chalk$Chalk,
    +red: chalk$Chalk,
    +green: chalk$Chalk,
    +yellow: chalk$Chalk,
    +blue: chalk$Chalk,
    +magenta: chalk$Chalk,
    +cyan: chalk$Chalk,
    +white: chalk$Chalk,
    +gray: chalk$Chalk,
    +grey: chalk$Chalk,
    +blackBright: chalk$Chalk,
    +redBright: chalk$Chalk,
    +greenBright: chalk$Chalk,
    +yellowBright: chalk$Chalk,
    +blueBright: chalk$Chalk,
    +magentaBright: chalk$Chalk,
    +cyanBright: chalk$Chalk,
    +whiteBright: chalk$Chalk,
    +bgBlack: chalk$Chalk,
    +bgRed: chalk$Chalk,
    +bgGreen: chalk$Chalk,
    +bgYellow: chalk$Chalk,
    +bgBlue: chalk$Chalk,
    +bgMagenta: chalk$Chalk,
    +bgCyan: chalk$Chalk,
    +bgWhite: chalk$Chalk,
    +bgGray: chalk$Chalk,
    +bgGrey: chalk$Chalk,
    +bgBlackBright: chalk$Chalk,
    +bgRedBright: chalk$Chalk,
    +bgGreenBright: chalk$Chalk,
    +bgYellowBright: chalk$Chalk,
    +bgBlueBright: chalk$Chalk,
    +bgMagentaBright: chalk$Chalk,
    +bgCyanBright: chalk$Chalk,
    +bgWhiteBright: chalk$Chalk,
    ...
  } & chalk$ChalkFunction;

  /**
   * Main Chalk object that allows to chain styles together.
   * Call the last one as a method with a string argument.
   * Order doesn't matter, and later styles take precedent in case of a conflict.
   * This simply means that `chalk.red.yellow.green` is equivalent to `chalk.green`.
   */
  declare var chalk: chalk$Chalk &
    chalk$ChalkFunction & {
    supportsColor: chalk$ColorSupport | false,
    Level: chalk$Level,
    Color: Color,
    ForegroundColor: ForegroundColor,
    BackgroundColor: BackgroundColor,
    Modifiers: Modifiers,
    stderr: chalk$Chalk & {
      supportsColor: chalk$ColorSupport | false,
      ...
    },
    ...
  };
  declare module.exports: typeof chalk;
}
