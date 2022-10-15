export {
    extractWordRange,
    extractSentenceRange,
    getTarget,
    getTargetByPoint,
    isArticleContent,
    abstract,
    recapTitle,
    recapDescription,
} from './core'

export { Dictionary } from './Dictionary'
export { Translator } from './Translator'
export { TouchGesture } from './utils/touch'
export { ReadHistory as ReadingHistory } from './ReadHistory'
export { ReadHistory } from './ReadHistory'

export { open as openDB } from './db'

export { setSetting, getSetting, removeSetting } from './utils/setting'
export { collect, eventCollect } from './utils/analytics'
export { getCoparent, getCoparentElement } from './utils/dom'

export type {
    CoreMessage,
    CoreMessage as MessageData,
    WordData,
    MessageType,
    TargetType,
} from './types'

export { detectRefusedDisplay, detectCSP } from './core'

export { themeOptions } from './theme'
