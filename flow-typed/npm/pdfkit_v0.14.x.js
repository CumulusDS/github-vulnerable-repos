/**
 * Flowtype definitions for pdfkit.ts
 * Generated by Flowgen from a Typescript Definition
 * Flowgen v1.21.0
 */

declare var PDFKit: typeof npm$namespace$PDFKit;

declare var npm$namespace$PDFKit: {|
  PDFGradient: Class<PDFKit$PDFGradient>,
  PDFLinearGradient: Class<PDFKit$PDFLinearGradient>,
  PDFRadialGradient: Class<PDFKit$PDFRadialGradient>,
  PDFTilingPattern: Class<PDFKit$PDFTilingPattern>,
  PDFData: Class<PDFKit$PDFData>,
  DocumentInfo: Class<PDFKit$DocumentInfo>,
  DocumentPermissions: Class<PDFKit$DocumentPermissions>,
  PDFDocumentOptions: Class<PDFKit$PDFDocumentOptions>,
  PDFDocument: Class<PDFKit$PDFDocument>,
  PDFPage: Class<PDFKit$PDFPage>,
  PDFKitReference: typeof PDFKit$PDFKitReference,
  PDFStructureContent: typeof PDFKit$PDFStructureContent,
  PDFStructureElement: typeof PDFKit$PDFStructureElement
|};
declare interface PDFKit$PDFGradient {
  new(document: any): PDFKit$PDFGradient;
  stop(pos: number, color?: string | PDFKit$PDFGradient, opacity?: number): PDFKit$PDFGradient;
  embed(): void;
  apply(): void;
}

declare type PDFKit$PDFLinearGradient = {
  new(document: any, x1: number, y1: number, x2: number, y2: number): PDFKit$PDFLinearGradient,
  shader(fn: () => any): any,
  opacityGradient(): PDFKit$PDFLinearGradient
} & PDFKit$PDFGradient;

declare type PDFKit$PDFRadialGradient = {
  new(document: any, x1: number, y1: number, x2: number, y2: number): PDFKit$PDFRadialGradient,
  shader(fn: () => any): any,
  opacityGradient(): PDFKit$PDFRadialGradient
} & PDFKit$PDFGradient;

declare interface PDFKit$PDFTilingPattern {
  new(
    document: any,
    bbox: PDFKit$Mixins$BoundingBox,
    xStep: number,
    yStep: number,
    stream: string
  ): PDFKit$PDFTilingPattern;
  createPattern(): PDFKit$PDFKitReference;
  embedPatternColorSpaces(): void;
  getPatternColorSpaceId(underlyingColorspace: string): string;
  embed(): void;
  apply(stroke: boolean, patternColor: PDFKit$Mixins$TilingPatternColorValue): PDFKit$PDFDocument;
}

declare var npm$namespace$PDFKit$Mixins: {|
  AnnotationOption: Class<PDFKit$Mixins$AnnotationOption>,
  PDFAnnotation: Class<PDFKit$Mixins$PDFAnnotation>,
  PDFAttachmentOptions: Class<PDFKit$Mixins$PDFAttachmentOptions>,
  PDFAttachment: Class<PDFKit$Mixins$PDFAttachment>,
  PDFColor: Class<PDFKit$Mixins$PDFColor>,
  PDFFont: Class<PDFKit$Mixins$PDFFont>,
  ImageOption: Class<PDFKit$Mixins$ImageOption>,
  PDFImage: Class<PDFKit$Mixins$PDFImage>,
  TextOptions: Class<PDFKit$Mixins$TextOptions>,
  PDFText: Class<PDFKit$Mixins$PDFText>,
  PDFVector: Class<PDFKit$Mixins$PDFVector>,
  PDFAcroForm: Class<PDFKit$Mixins$PDFAcroForm>,
  PDFMarking: Class<PDFKit$Mixins$PDFMarking>,
  MarkingOptions: Class<PDFKit$Mixins$MarkingOptions>,
  StructureElementOptions: Class<PDFKit$Mixins$StructureElementOptions>,
  PageMarking: Class<PDFKit$Mixins$PageMarking>,
  PDFMetadata: Class<PDFKit$Mixins$PDFMetadata>,
  PDFSubset: Class<PDFKit$Mixins$PDFSubset>
|};
declare interface PDFKit$Mixins$AnnotationOption {
  Type?: string | void;
  Rect?: any;
  Border?: number[] | void;
  SubType?: string | void;
  Contents?: string | void;
  Name?: string | void;
  color?: string | void;
  QuadPoints?: number[] | void;
  A?: any;
  B?: any;
  C?: any;
  L?: any;
  DA?: string | void;
}

declare interface PDFKit$Mixins$PDFAnnotation {
  annotate(
    x: number,
    y: number,
    w: number,
    h: number,
    option: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  note(
    x: number,
    y: number,
    w: number,
    h: number,
    content: string,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  goTo(
    x: number,
    y: number,
    w: number,
    h: number,
    name: string,
    options?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  link(
    x: number,
    y: number,
    w: number,
    h: number,
    url: string,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  highlight(
    x: number,
    y: number,
    w: number,
    h: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  underline(
    x: number,
    y: number,
    w: number,
    h: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  strike(
    x: number,
    y: number,
    w: number,
    h: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  lineAnnotation(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  rectAnnotation(
    x: number,
    y: number,
    w: number,
    h: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  ellipseAnnotation(
    x: number,
    y: number,
    w: number,
    h: number,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
  textAnnotation(
    x: number,
    y: number,
    w: number,
    h: number,
    text: string,
    option?: PDFKit$Mixins$AnnotationOption
  ): PDFKit$Mixins$PDFAnnotation;
}

declare interface PDFKit$Mixins$PDFAttachmentOptions {
  name?: string;
  type?: string;
  description?: string;
  hidden?: boolean;
  creationDate?: Date;
  modifiedDate?: Date;
}

declare interface PDFKit$Mixins$PDFAttachment {
  /**
   * Embed content of `src` in PDF
   */
  file(src: Buffer | ArrayBuffer | string, options?: PDFKit$Mixins$PDFAttachmentOptions): PDFKit$Mixins$PDFAttachment;
}

declare type PDFKit$Mixins$ColorValue =
  | string
  | PDFKit$PDFGradient
  | [PDFKit$PDFTilingPattern, PDFKit$Mixins$TilingPatternColorValue]
  | [number, number, number]
  | [number, number, number, number];

declare type PDFKit$Mixins$TilingPatternColorValue =
  | string
  | PDFKit$PDFGradient
  | [number, number, number]
  | [number, number, number, number];

declare type PDFKit$Mixins$RuleValue = "even-odd" | "evenodd" | "non-zero" | "nonzero";

declare type PDFKit$Mixins$OpenTypeFeatures =
  | "aalt"
  | "abvf"
  | "abvm"
  | "abvs"
  | "afrc"
  | "akhn"
  | "blwf"
  | "blwm"
  | "blws"
  | "calt"
  | "case"
  | "cfar"
  | "cjct"
  | "clig"
  | "cpct"
  | "cpsp"
  | "cswh"
  | "curs"
  | "cv01"
  | "cv02"
  | "cv03"
  | "cv04"
  | "cv05"
  | "cv06"
  | "cv07"
  | "cv08"
  | "cv09"
  | "cv10"
  | "cv11"
  | "cv12"
  | "cv13"
  | "cv14"
  | "cv15"
  | "cv16"
  | "cv17"
  | "cv18"
  | "cv19"
  | "cv20"
  | "cv21"
  | "cv22"
  | "cv23"
  | "cv24"
  | "cv25"
  | "cv26"
  | "cv27"
  | "cv28"
  | "cv29"
  | "cv30"
  | "cv31"
  | "cv32"
  | "cv33"
  | "cv34"
  | "cv35"
  | "cv36"
  | "cv37"
  | "cv38"
  | "cv39"
  | "cv40"
  | "cv41"
  | "cv42"
  | "cv43"
  | "cv44"
  | "cv45"
  | "cv46"
  | "cv47"
  | "cv48"
  | "cv49"
  | "cv50"
  | "cv51"
  | "cv52"
  | "cv53"
  | "cv54"
  | "cv55"
  | "cv56"
  | "cv57"
  | "cv58"
  | "cv59"
  | "cv60"
  | "cv61"
  | "cv62"
  | "cv63"
  | "cv64"
  | "cv65"
  | "cv66"
  | "cv67"
  | "cv68"
  | "cv69"
  | "cv70"
  | "cv71"
  | "cv72"
  | "cv73"
  | "cv74"
  | "cv75"
  | "cv76"
  | "cv77"
  | "cv78"
  | "cv79"
  | "cv80"
  | "cv81"
  | "cv82"
  | "cv83"
  | "cv84"
  | "cv85"
  | "cv86"
  | "cv87"
  | "cv88"
  | "cv89"
  | "cv90"
  | "cv91"
  | "cv92"
  | "cv93"
  | "cv94"
  | "cv95"
  | "cv96"
  | "cv97"
  | "cv98"
  | "cv99"
  | "c2pc"
  | "c2sc"
  | "dist"
  | "ccmp"
  | "dlig"
  | "dnom"
  | "dtls"
  | "expt"
  | "falt"
  | "fin2"
  | "fin3"
  | "fina"
  | "flac"
  | "frac"
  | "fwid"
  | "half"
  | "haln"
  | "halt"
  | "hist"
  | "hkna"
  | "hlig"
  | "hngl"
  | "hojo"
  | "hwid"
  | "init"
  | "isol"
  | "ital"
  | "jalt"
  | "jp78"
  | "jp83"
  | "jp90"
  | "jp04"
  | "kern"
  | "lfbd"
  | "liga"
  | "ljmo"
  | "lnum"
  | "locl"
  | "ltra"
  | "ltrm"
  | "mark"
  | "med2"
  | "medi"
  | "mgrk"
  | "mkmk"
  | "mset"
  | "nalt"
  | "nlck"
  | "nukt"
  | "numr"
  | "onum"
  | "opbd"
  | "ordn"
  | "ornm"
  | "palt"
  | "pcap"
  | "pkna"
  | "pnum"
  | "pref"
  | "pres"
  | "pstf"
  | "psts"
  | "pwid"
  | "qwid"
  | "rand"
  | "rclt"
  | "rkrf"
  | "rlig"
  | "rphf"
  | "rtbd"
  | "rtla"
  | "rtlm"
  | "ruby"
  | "rvrn"
  | "salt"
  | "sinf"
  | "size"
  | "smcp"
  | "smpl"
  | "ss01"
  | "ss02"
  | "ss03"
  | "ss04"
  | "ss05"
  | "ss06"
  | "ss07"
  | "ss08"
  | "ss09"
  | "ss10"
  | "ss11"
  | "ss12"
  | "ss13"
  | "ss14"
  | "ss15"
  | "ss16"
  | "ss17"
  | "ss18"
  | "ss19"
  | "ss20"
  | "ssty"
  | "stch"
  | "subs"
  | "sups"
  | "swsh"
  | "titl"
  | "tjmo"
  | "tnam"
  | "tnum"
  | "trad"
  | "twid"
  | "unic"
  | "valt"
  | "vatu"
  | "vert"
  | "vhal"
  | "vjmo"
  | "vkna"
  | "vkrn"
  | "vpal"
  | "vrt2"
  | "vrtr"
  | "zero";

declare type PDFKit$Mixins$BoundingBox = [number, number, number, number];

declare interface PDFKit$Mixins$PDFColor {
  fillColor(color: PDFKit$Mixins$ColorValue, opacity?: number): PDFKit$Mixins$PDFColor;
  strokeColor(color: PDFKit$Mixins$ColorValue, opacity?: number): PDFKit$Mixins$PDFColor;
  opacity(opacity: number): PDFKit$Mixins$PDFColor;
  fillOpacity(opacity: number): PDFKit$Mixins$PDFColor;
  strokeOpacity(opacity: number): PDFKit$Mixins$PDFColor;
  linearGradient(x1: number, y1: number, x2: number, y2: number): PDFKit$PDFLinearGradient;
  radialGradient(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): PDFKit$PDFRadialGradient;
  pattern(bbox: PDFKit$Mixins$BoundingBox, xStep: number, yStep: number, stream: string): PDFKit$PDFTilingPattern;
}

declare type PDFKit$Mixins$PDFFontSource = string | Buffer | Uint8Array | ArrayBuffer;

declare interface PDFKit$Mixins$PDFFont {
  font(src: PDFKit$Mixins$PDFFontSource, size?: number): PDFKit$Mixins$PDFFont;
  font(src: PDFKit$Mixins$PDFFontSource, family: string, size?: number): PDFKit$Mixins$PDFFont;
  fontSize(size: number): PDFKit$Mixins$PDFFont;
  currentLineHeight(includeGap?: boolean): number;

  /**
   * Helpful method to give a font an alias, eg: `registerFont('bold', './Roboto.ttf')`
   */
  registerFont(name: string, src?: PDFKit$Mixins$PDFFontSource, family?: string): PDFKit$Mixins$PDFFont;
}

declare type PDFKit$Mixins$ImageSrc = Buffer | ArrayBuffer | string;

declare interface PDFKit$Mixins$ImageOption {
  width?: number | void;
  height?: number | void;

  /**
   * Scale percentage
   */
  scale?: number | void;

  /**
   * Two elements array specifying dimensions(w,h)
   */
  fit?: [number, number] | void;
  cover?: [number, number] | void;
  align?: "center" | "right" | void;
  valign?: "center" | "bottom" | void;
  link?: string | PDFKit$Mixins$AnnotationOption | void;
  goTo?: PDFKit$Mixins$AnnotationOption | void;
  destination?: string | void;
}

declare interface PDFKit$Mixins$PDFImage {
  /**
   * Draw an image in PDFKit document.
   *
   * Warning: If string 'src' is provided, the file will be loaded synchronously using `fs.readFileSync(src)`!
   */
  image(
    src: PDFKit$Mixins$ImageSrc,
    x?: number,
    y?: number,
    options?: PDFKit$Mixins$ImageOption
  ): PDFKit$Mixins$PDFImage;
  image(src: PDFKit$Mixins$ImageSrc, options?: PDFKit$Mixins$ImageOption): PDFKit$Mixins$PDFImage;
}

declare interface PDFKit$Mixins$TextOptions {
  /**
   * Set to false to disable line wrapping all together
   */
  lineBreak?: boolean | void;

  /**
   * The width that text should be wrapped to (by default, the page width minus the left and right margin)
   */
  width?: number | void;

  /**
   * The maximum height that text should be clipped to
   */
  height?: number | void;

  /**
   * The character to display at the end of the text when it is too long. Set to true to use the default character.
   */
  ellipsis?: boolean | string | void;

  /**
   * The number of columns to flow the text into
   */
  columns?: number | void;

  /**
   * The amount of space between each column (1/4 inch by default)
   */
  columnGap?: number | void;

  /**
   * The amount in PDF points (72 per inch) to indent each paragraph of text
   */
  indent?: number | void;

  /**
   * The amount of space between each paragraph of text
   */
  paragraphGap?: number | void;

  /**
   * The amount of space between each line of text
   */
  lineGap?: number | void;

  /**
   * The amount of space between each word in the text
   */
  wordSpacing?: number | void;

  /**
   * The amount of space between each character in the text
   */
  characterSpacing?: number | void;

  /**
   * Whether to fill the text (true by default)
   */
  fill?: boolean | void;

  /**
   * Whether to stroke the text
   */
  stroke?: boolean | void;

  /**
   * A URL to link this text to (shortcut to create an annotation)
   */
  link?: string | null | void;

  /**
   * Whether to underline the text
   */
  underline?: boolean | void;

  /**
   * Whether to strike out the text
   */
  strike?: boolean | void;

  /**
   * Whether the text segment will be followed immediately by another segment. Useful for changing styling in the middle of a paragraph.
   */
  continued?: boolean | void;

  /**
   * Whether to slant the text (angle in degrees or true)
   */
  oblique?: boolean | number | void;

  /**
   * The alignment of the text (center, justify, left, right)
   */
  align?: "center" | "justify" | "left" | "right" | void;

  /**
   * The vertical alignment of the text with respect to its insertion point
   */
  baseline?:
    | number
    | "svg-middle"
    | "middle"
    | "svg-central"
    | "bottom"
    | "ideographic"
    | "alphabetic"
    | "mathematical"
    | "hanging"
    | "top"
    | void;

  /**
   * An array of OpenType feature tags to apply. If not provided, a set of defaults is used.
   */
  features?: PDFKit$Mixins$OpenTypeFeatures[] | void;

  /**
   * Sets a list as unordered, ordered or lettered
   */
  listType?: "bullet" | "numbered" | "lettered" | void;

  /**
   * The radius of bullet points in a list. Works only with listType: 'bullet'
   */
  bulletRadius?: number | void;

  /**
   * The indent of bullet points in a list
   */
  bulletIndent?: number | void;

  /**
   * The indent of text in a list
   */
  textIndent?: number | void;
  destination?: string | void;
  goTo?: string | void;

  /**
   * The parent structure element to add this child element to, for usage with text() and list()
   */
  structParent?: PDFKit$PDFStructureElement | void;

  /**
   * The marking type used by text(), defaults to 'P'
   */
  structType?: string | void;

  /**
   * The marking types used by items of list(), defaults to [ 'LI', 'Lbl', 'LBody' ]
   */
  structTypes?: [string | null, string | null, string | null] | void;
}

declare interface PDFKit$Mixins$PDFText {
  lineGap(lineGap: number): PDFKit$Mixins$PDFText;
  moveDown(line?: number): PDFKit$Mixins$PDFText;
  moveUp(line?: number): PDFKit$Mixins$PDFText;
  text(text: string, x?: number, y?: number, options?: PDFKit$Mixins$TextOptions): PDFKit$Mixins$PDFText;
  text(text: string, options?: PDFKit$Mixins$TextOptions): PDFKit$Mixins$PDFText;
  widthOfString(text: string, options?: PDFKit$Mixins$TextOptions): number;
  heightOfString(text: string, options?: PDFKit$Mixins$TextOptions): number;
  list(list: Array<string | any>, x?: number, y?: number, options?: PDFKit$Mixins$TextOptions): PDFKit$Mixins$PDFText;
  list(list: Array<string | any>, options?: PDFKit$Mixins$TextOptions): PDFKit$Mixins$PDFText;
}

declare interface PDFKit$Mixins$PDFVector {
  save(): PDFKit$Mixins$PDFVector;
  restore(): PDFKit$Mixins$PDFVector;
  closePath(): PDFKit$Mixins$PDFVector;
  lineWidth(w: number): PDFKit$Mixins$PDFVector;
  lineCap(c: string): PDFKit$Mixins$PDFVector;
  lineJoin(j: string): PDFKit$Mixins$PDFVector;
  miterLimit(m: any): PDFKit$Mixins$PDFVector;
  dash(length: number, option: any): PDFKit$Mixins$PDFVector;
  undash(): PDFKit$Mixins$PDFVector;
  moveTo(x: number, y: number): PDFKit$Mixins$PDFVector;
  lineTo(x: number, y: number): PDFKit$Mixins$PDFVector;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): PDFKit$Mixins$PDFVector;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): PDFKit$Mixins$PDFVector;
  rect(x: number, y: number, w: number, h: number): PDFKit$Mixins$PDFVector;
  roundedRect(x: number, y: number, w: number, h: number, r?: number): PDFKit$Mixins$PDFVector;
  ellipse(x: number, y: number, r1: number, r2?: number): PDFKit$Mixins$PDFVector;
  circle(x: number, y: number, radius: number): PDFKit$Mixins$PDFVector;
  polygon(...points: number[][]): PDFKit$Mixins$PDFVector;
  path(path: string): PDFKit$Mixins$PDFVector;
  fill(color?: PDFKit$Mixins$ColorValue, rule?: PDFKit$Mixins$RuleValue): PDFKit$Mixins$PDFVector;
  fill(rule: PDFKit$Mixins$RuleValue): PDFKit$Mixins$PDFVector;
  stroke(color?: PDFKit$Mixins$ColorValue): PDFKit$Mixins$PDFVector;
  fillAndStroke(
    fillColor?: PDFKit$Mixins$ColorValue,
    strokeColor?: PDFKit$Mixins$ColorValue,
    rule?: PDFKit$Mixins$RuleValue
  ): PDFKit$Mixins$PDFVector;
  fillAndStroke(fillColor: PDFKit$Mixins$ColorValue, rule?: PDFKit$Mixins$RuleValue): PDFKit$Mixins$PDFVector;
  fillAndStroke(rule: PDFKit$Mixins$RuleValue): PDFKit$Mixins$PDFVector;
  clip(rule?: PDFKit$Mixins$RuleValue): PDFKit$Mixins$PDFVector;
  transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): PDFKit$Mixins$PDFVector;
  translate(x: number, y: number): PDFKit$Mixins$PDFVector;
  rotate(
    angle: number,
    options?: {|
      origin?: number[] | void
    |}
  ): PDFKit$Mixins$PDFVector;
  scale(
    xFactor: number,
    yFactor?: number,
    options?: {|
      origin?: number[] | void
    |}
  ): PDFKit$Mixins$PDFVector;
}

declare interface PDFKit$Mixins$PDFAcroForm {
  /**
   * Must call if adding AcroForms to a document. Must also call font() before
   * this method to set the default font.
   */
  initForm(): PDFKit$Mixins$PDFAcroForm;

  /**
   * Called automatically by document.js
   */
  endAcroForm(): PDFKit$Mixins$PDFAcroForm;

  /**
   * Creates and adds a form field to the document. Form fields are intermediate
   * nodes in a PDF form that are used to specify form name hierarchy and form
   * value defaults.
   * @param name - field name (T attribute in field dictionary)
   * @param options - other attributes to include in the field dictionary
   */
  formField(name: string, options?: { [key: string]: any }): PDFKit$PDFKitReference;

  /**
   * Creates and adds a Form Annotation to the document. Form annotations are
   * called Widget annotations internally within a PDF file.
   * @param name - form field name (T attribute of widget annotation
   * dictionary)
   */
  formAnnotation(
    name: string,
    type: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formText(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formPushButton(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formCombo(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formList(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formRadioButton(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
  formCheckbox(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,
    options?: { [key: string]: any }
  ): PDFKit$Mixins$PDFAcroForm;
}

declare interface PDFKit$Mixins$PDFMarking {
  markContent(tag: string, options?: PDFKit$Mixins$MarkingOptions): PDFKit$Mixins$PDFMarking;
  endMarkedContent(): PDFKit$Mixins$PDFMarking;
  struct(
    tag: string,
    options?: PDFKit$Mixins$StructureElementOptions,
    children?: PDFKit$PDFStructureElementChild | PDFKit$PDFStructureElementChild[]
  ): PDFKit$PDFStructureElement;
  addStructure(structElem: PDFKit$PDFStructureElement): PDFKit$Mixins$PDFMarking;
  initMarkings(options?: {|
    tagged?: boolean
  |}): void;
  initPageMarkings(pageMarkings: PDFKit$Mixins$PageMarking[]): void;
  endPageMarkings(page: PDFKit$PDFPage): PDFKit$Mixins$PageMarking[];
  markStructureContent(tag: string, options?: PDFKit$Mixins$MarkingOptions): PDFKit$PDFStructureContent;
  getMarkingsDictionary(): PDFKit$PDFKitReference;
  getStructTreeRoot(): PDFKit$PDFKitReference;
  createStructParentTreeNextKey(): number;
  endMarkings(): void;
}

declare interface PDFKit$Mixins$MarkingOptions {
  type?: "Pagination" | "Layout" | "Page";
  bbox?: [number, number, number, number];
  attached?: string[];
  lang?: string;
  alt?: string;
  expanded?: string;
  actual?: string;
}

declare interface PDFKit$Mixins$StructureElementOptions {
  title?: string;
  lang?: string;
  alt?: string;
  expanded?: string;
  actual?: string;
}

declare interface PDFKit$Mixins$PageMarking {
  tag: string;
  structContent?: PDFKit$PDFStructureContent;
  options?: PDFKit$Mixins$MarkingOptions;
}

declare interface PDFKit$Mixins$PDFMetadata {
  /**
   * Called automatically
   */
  initMetadata(): void;
  appendXML(XMLxml: string, newLine?: boolean): void;

  /**
   * Called automatically
   */
  endMetadata(): void;
}

declare type PDFKit$Mixins$PDFSubsets =
  | "PDF/A-1"
  | "PDF/A-1a"
  | "PDF/A-1b"
  | "PDF/A-2"
  | "PDF/A-2a"
  | "PDF/A-2b"
  | "PDF/A-3"
  | "PDF/A-3a"
  | "PDF/A-3b";

declare interface PDFKit$Mixins$PDFSubset {
  initSubset(options: {|
    subset: PDFKit$Mixins$PDFSubsets
  |}): void;
  endSubset(): void;
}

/**
 * PDFKit data
 */
declare interface PDFKit$PDFData {
  new(data: any[]): PDFKit$PDFData;
  readByte(): any;
  writeByte(byte: any): void;
  byteAt(index: number): any;
  readBool(): boolean;
  writeBool(val: boolean): boolean;
  readUInt32(): number;
  writeUInt32(val: number): void;
  readInt32(): number;
  writeInt32(val: number): void;
  readUInt16(): number;
  writeUInt16(val: number): void;
  readInt16(): number;
  writeInt16(val: number): void;
  readString(length: number): string;
  writeString(val: string): void;
  stringAt(pos: number, length: number): string;
  readShort(): number;
  writeShort(val: number): void;
  readLongLong(): number;
  writeLongLong(val: number): void;
  readInt(): number;
  writeInt(val: number): void;
  slice(start: number, end: number): any[];
  read(length: number): any[];
  write(bytes: any[]): void;
}

declare interface PDFKit$DocumentInfo {
  Producer?: string | void;
  Creator?: string | void;
  CreationDate?: Date | void;
  Title?: string | void;
  Author?: string | void;
  Subject?: string | void;
  Keywords?: string | void;
  ModDate?: Date | void;
}

declare interface PDFKit$DocumentPermissions {
  modifying?: boolean | void;
  copying?: boolean | void;
  annotating?: boolean | void;
  fillingForms?: boolean | void;
  contentAccessibility?: boolean | void;
  documentAssembly?: boolean | void;
  printing?: "lowResolution" | "highResolution" | void;
}

declare interface PDFKit$PDFDocumentOptions {
  compress?: boolean | void;
  info?: PDFKit$DocumentInfo | void;
  userPassword?: string | void;
  ownerPassword?: string | void;
  permissions?: PDFKit$DocumentPermissions | void;
  pdfVersion?: "1.3" | "1.4" | "1.5" | "1.6" | "1.7" | "1.7ext3" | void;
  autoFirstPage?: boolean | void;
  size?: number[] | string | void;
  margin?: number | void;
  margins?: {|
    top: number,
    left: number,
    bottom: number,
    right: number
  |} | void;
  layout?: "portrait" | "landscape" | void;
  font?: string | void;
  bufferPages?: boolean | void;
  tagged?: boolean;
  lang?: string;
  displayTitle?: boolean;
  subset?: PDFKit$Mixins$PDFSubsets;
}

declare type PDFKit$PDFDocument = {
  /**
   * PDF Version
   */
  version: number,

  /**
   * Whenever streams should be compressed
   */
  compress: boolean,

  /**
   * PDF document Metadata
   */
  info: PDFKit$DocumentInfo,

  /**
   * Options for the document
   */
  options: PDFKit$PDFDocumentOptions,

  /**
   * Represent the current page.
   */
  page: PDFKit$PDFPage,
  x: number,
  y: number,
  new(options?: PDFKit$PDFDocumentOptions): PDFKit$PDFDocument,
  addPage(options?: PDFKit$PDFDocumentOptions): PDFKit$PDFDocument,
  bufferedPageRange(): {|
    start: number,
    count: number
  |},
  switchToPage(n?: number): PDFKit$PDFPage,
  flushPages(): void,
  ref(data: {||}): PDFKit$PDFKitReference,
  addContent(data: any): PDFKit$PDFDocument,

  /**
   * Deprecated
   */
  write(fileName: string, fn: any): void,

  /**
   * Deprecated. Throws exception
   */
  output(fn: any): void,
  end(): void,
  toString(): string
} & NodeJS$ReadableStream &
  PDFKit$Mixins$PDFMetadata &
  PDFKit$Mixins$PDFAnnotation &
  PDFKit$Mixins$PDFColor &
  PDFKit$Mixins$PDFImage &
  PDFKit$Mixins$PDFText &
  PDFKit$Mixins$PDFVector &
  PDFKit$Mixins$PDFFont &
  PDFKit$Mixins$PDFAcroForm &
  PDFKit$Mixins$PDFMarking &
  PDFKit$Mixins$PDFAttachment &
  PDFKit$Mixins$PDFMetadata &
  PDFKit$Mixins$PDFSubset;

/**
 * Represent a single page in the PDF document
 */
declare interface PDFKit$PDFPage {
  size: string;
  layout: string;
  margins: {|
    top: number,
    left: number,
    bottom: number,
    right: number
  |};
  width: number;
  height: number;
  document: PDFKit$PDFDocument;
  content: PDFKit$PDFKitReference;

  /**
   * The page dictionary
   */
  dictionary: PDFKit$PDFKitReference;
  fonts: any;
  xobjects: any;
  ext_gstates: any;
  patterns: any;
  annotations: any;
  maxY(): number;
  write(chunk: any): void;
  end(): void;
}

/**
 * PDFReference - represents a reference to another object in the PDF object hierarchy
 */
declare class PDFKit$PDFKitReference {
  id: number;
  gen: number;
  deflate: any;
  compress: boolean;
  uncompressedLength: number;
  chunks: any[];
  data: {|
    Font?: any,
    XObject?: any,
    ExtGState?: any,
    Pattern: any,
    Annots: any
  |};
  document: PDFKit$PDFDocument;
  constructor(document: PDFKit$PDFDocument, id: number, data: {||}): this;
  initDeflate(): void;
  write(chunk: any): void;
  end(chunk: any): void;
  finalize(): void;
  toString(): string;
}

/**
 * PDFStructureContent
 */
declare class PDFKit$PDFStructureContent {
  constructor(pageRef: PDFKit$PDFKitReference, mcid: number): this;
  push(structContent: PDFKit$PDFStructureContent): void;
}

declare type PDFKit$PDFStructureElementChild = (() => any) | PDFKit$PDFStructureElement | PDFKit$PDFStructureContent;

/**
 * PDFStructureElement
 */
declare class PDFKit$PDFStructureElement {
  constructor(
    document: PDFKit$PDFDocument,
    type: string,
    options?: {|
      title?: string,
      lang?: string,
      alt?: string,
      expanded?: string,
      actual?: string
    |},
    children?: PDFKit$PDFStructureElementChild | PDFKit$PDFStructureElementChild[]
  ): this;
  constructor(
    document: PDFKit$PDFDocument,
    type: string,
    children?: PDFKit$PDFStructureElementChild | PDFKit$PDFStructureElementChild[]
  ): this;
  add(el: PDFKit$PDFStructureElementChild): PDFKit$PDFStructureElement;
  setParent(parentRef: PDFKit$PDFKitReference): void;
  setAttached(): void;
  end(): void;
}
declare module "pdfkit/js/data" {
  declare var PDFKitData: PDFKit$PDFData;
  declare module.exports: typeof PDFKitData;
}

declare module "pdfkit" {
  declare var doc: PDFKit$PDFDocument;
  declare export default PDFKit$PDFDocument;
}

declare module "pdfkit/js/gradient" {
  declare var gradient: {|
    PDFGradient: PDFKit$PDFGradient,
    PDFLinearGradient: PDFKit$PDFLinearGradient,
    PDFRadialGradiant: PDFKit$PDFRadialGradient
  |};
  declare module.exports: typeof gradient;
}

declare module "pdfkit/js/pattern" {
  declare var pattern: {|
    PDFTilingPattern: PDFKit$PDFTilingPattern
  |};
  declare module.exports: typeof pattern;
}

declare module "pdfkit/js/page" {
  declare var PDFKitPage: PDFKit$PDFPage;
  declare module.exports: typeof PDFKitPage;
}

declare module "pdfkit/js/reference" {
  declare var PDFKitReference: PDFKit$PDFKitReference;
  declare module.exports: typeof PDFKitReference;
}

declare module "pdfkit/js/structure_content" {
  declare var PDFStructureContent: PDFKit$PDFStructureContent;
  declare module.exports: typeof PDFStructureContent;
}

declare module "pdfkit/js/structure_element" {
  declare var PDFStructureElement: PDFKit$PDFStructureElement;
  declare module.exports: typeof PDFStructureElement;
}

declare module "pdfkit/js/mixins/annotations" {
  declare var PDFKitAnnotation: PDFKit$Mixins$PDFAnnotation;
  declare module.exports: typeof PDFKitAnnotation;
}

declare module "pdfkit/js/mixins/color" {
  declare var PDFKitColor: PDFKit$Mixins$PDFColor;
  declare module.exports: typeof PDFKitColor;
}

declare module "pdfkit/js/mixins/fonts" {
  declare var PDFKitFont: PDFKit$Mixins$PDFFont;
  declare module.exports: typeof PDFKitFont;
}

declare module "pdfkit/js/mixins/images" {
  declare var PDFKitImage: PDFKit$Mixins$PDFImage;
  declare module.exports: typeof PDFKitImage;
}

declare module "pdfkit/js/mixins/text" {
  declare var PDFKitText: PDFKit$Mixins$PDFText;
  declare module.exports: typeof PDFKitText;
}

declare module "pdfkit/js/mixins/vector" {
  declare var PDFKitVector: PDFKit$Mixins$PDFVector;
  declare module.exports: typeof PDFKitVector;
}

declare module "pdfkit/js/mixins/markings" {
  declare var PDFKitMarking: PDFKit$Mixins$PDFMarking;
  declare module.exports: typeof PDFKitMarking;
}