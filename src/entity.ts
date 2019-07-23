import { Targetable, TargetTypes } from ".";

const valid_selector_regex = new RegExp("@(p|a|r|e|s)( |\[(.+=.+)+\]).*")

export enum EntityType {
    NEAREST_PLAYER = '@p',
    ALL_PLAYERS = '@a',
    RANDOM_PLAYER = '@r',
    ALL_ENTITIES = '@e',
    EXECUTOR = '@s'
}

export enum EntitySelectorType {
    ADVANCEMENT = 'advancements',
    DISTANCE ='distance',
    DX = 'dx',
    DY = 'dy',
    DZ = 'dz',
    GAMEMODE = 'gamemode',
    LEVEL = 'level',
    LIMIT = 'limit',
    NAME = 'name',
    NBT = 'nbt',
    SCORES = 'scores',
    SORT = 'sort',
    TAG = 'tag',
    TEAM = 'team',
    TYPE = 'type',
    X = 'x',
    XROT = 'x_rotation',
    Y = 'y',
    YROT = 'y_rotation',
    Z = 'z'
}



export class Entity implements Targetable{ 
    public type :EntityType;
    public selectors :Array<{}>

    constructor(selector :string | undefined){

        if (selector){
            if(!valid_selector_regex.test(selector))
                throw "invalid selector error"

            this.selectors = []

            //@ts-nocheck
            switch(selector.charAt(1)){
            case 'p':
                this.type = EntityType.NEAREST_PLAYER
                break
            case 'a':
                this.type = EntityType.ALL_ENTITIES
                break
            case 'r':
                this.type = EntityType.RANDOM_PLAYER
                break
            case 'e':
                this.type = EntityType.ALL_ENTITIES
                break
            case 's':
                this.type = EntityType.EXECUTOR
                break
            default:
                throw 'unrecognised selector error'
            }

            if (selector.charAt(2) === '['){
            let endIndex = selector.indexOf(']')
            let trimmed = selector.slice(2, endIndex)

            this.selectors = trimmed
                .split(',')
                .map(rule => {
                    let [selector, value] = rule.split('=')
                    let ptr :any = {}
                    ptr[selector] = value
                    return ptr
                })

            }
        }
        this.defaultTarget()
    }
    target(targetType :TargetTypes, data? :any){
        switch(targetType){
            case TargetTypes.ENITY:
                return `entity ${this.build()}`
            case TargetTypes.DATA:
                return `data ${this.build()} ${data}`
            case TargetTypes.BLOCK:
                throw "an entity cannot be targeted as a block"
            case TargetTypes.BLOCKS:
                throw "an entity cannot be targeted as blocks"
        }
    }

    build() :string{
        if(this.selectors){
            let fmtSelectors = Object.entries(this.selectors)
                .map(([selector, value]) => (`${selector}=${value}`))
                .join(',')

            return `@${this.type}[${fmtSelectors}]`
        } else {
            return `@${this.type}`
        }
    }

}