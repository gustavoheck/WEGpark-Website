export default interface Vehicle {
    uuid : string
    plate : string,
    brand : string,
    model : string,
    color : string,
    ownerId : string,
    isOwner? : boolean
}