import * as Entity from './entity'

declare module "@minescript/entity" {
    export default Entity
}

declare module "@minescript/execute"{

}

declare module "@minescript/function"{

}

declare module "@minescript/command"{

}

export type Vector3 = [number,number,number]
export enum Anchored {
    FEET = "feet",
    EYES = "eyes"
}
export enum Dimension {
    OVERWORLD = "overworld",
    NETHER = "the_nether",
    END = "the_end"
}

export enum TargetTypes {
    BLOCK = 'block',
    BLOCKS = 'blocks',
    ENITY = 'entity',
    DATA = 'data'
}

export interface Command {
    build() :string
}

export interface Targetable {
    target(type :TargetTypes) :string
}

export interface EntityTargetable extends Targetable{
    target(type :TargetTypes.ENITY) :string
}
export interface BlockTargetable extends Targetable{
    target(type :TargetTypes.BLOCK) :string
}
export interface BlocksTargetable extends Targetable{
    target(type :TargetTypes.BLOCKS) :string
}
export interface DataTargetable extends Targetable{
    target(type :TargetTypes.DATA) :string
}