import { Vector3, Anchored, Dimension, Command, Targetable, BlockTargetable, BlocksTargetable, EntityTargetable, DataTargetable, TargetTypes } from ".";
import { Entity } from "./entity";


export type ExeArgs = {
    align? :Vector3
    Anchored? :Anchored
    as? :Entity 
    at? :Entity 
    facing? :[Vector3, Anchored?] | [Entity, Anchored?]
    in? :Dimension | undefined
    positioned? :Vector3 | Entity 
    rotated? :Vector3 | Entity 
    if? :[Targetable, Command]
    unless? :[Targetable, Command] 
}

export class Execute implements Command{
    Align :Vector3
    Anchored :Anchored
    As :Entity 
    At :Entity 
    Facing :[Vector3 | Entity, Anchored?]
    In :Dimension | undefined
    Positioned :Vector3 | Entity 
    Rotated :Vector3 | Entity 
    If :IFselector
    Unless :IFselector
    Run :Command
    constructor(args :ExeArgs){
        Object.assign(this, args)
    }

    build(){
        return `execute ${this.As ? `as ${this.As.build()}`:''} ${this.At ? `at ${this.At.build()}`:''} ${this.In ? `in ${this.In}`:''} ${this.As ? `as ${this.As.build()}`:''}`
    }

    align(alignment :Vector3) :Execute{
        this.Align = alignment
        return this
    }

    anchored(anchor :Anchored) :Execute{
        this.Anchored = anchor
        return this
    }

    as(target :Entity) :Execute{
        this.As = target
        return this
    }
    
    at(target :Entity) :Execute{
        this.At = target
        return this
    }

    in(dimension :Dimension) :Execute{
        this.In = dimension
        return this
    }

    facing(target :Vector3 | Entity, anchor? :Anchored){
        this.Facing = [target, anchor]
        return this
    }

    positioned(target :Vector3 | Entity){
        this.Positioned = target
        return this
    }

    rotated(target :Vector3 | Entity){
        this.Rotated = target
        return this
    }

    IF(){
        this.If = new IFselector(this, true) 
        return this.If
    }

    UNLESS(){
        this.Unless = new IFselector(this, false)
        return this.Unless
    }

    run(command :Command){
        this.Run = command
        return this
    }
}

class IFselector {
    private thisRef :any
    public build :() => string
    private ifUnless :string
    constructor(thisRef :any, ifUnless :Boolean){
        this.thisRef = thisRef
        this.ifUnless = ifUnless ? "if" : "unless"
        if (this.thisRef.Unless){
            throw "this executor cannot contain an if and an unless"
        }
        this.build = () => {throw "no selection style selected"}

    }
    byBlock(target :BlockTargetable){
        let command = this.ifUnless 
        this.build = () => (`${command} ${target.target(TargetTypes.BLOCK)}`)
    }
    byBlocks(target :BlocksTargetable){
        let command = this.ifUnless 
        this.build = () => (`${command} ${target.target(TargetTypes.BLOCKS)}`)
    }
    byEntity(target :EntityTargetable){
        let command = this.ifUnless 
        this.build = () => (`${command} ${target.target(TargetTypes.ENITY)}`)
    }
    byData(target :DataTargetable){
        let command = this.ifUnless 
        this.build = () => (`${command} ${target.target(TargetTypes.DATA)}`)
    }
    THEN(command :Command){
        this.thisRef.Run = command
        return this.thisRef
    }
}