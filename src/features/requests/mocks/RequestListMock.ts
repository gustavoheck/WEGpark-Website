import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { Request } from "../types/Request";
import UserMock from "@/shared/mocks/UserMock";



const RequestListMock : Request[] = [
    {
        uuid : "111-111",
        vehicle : VehicleListMock[0],
        user : UserMock
    }, 
    {
        uuid : "222-222",
        vehicle : VehicleListMock[1],
        user : UserMock
    },
    {
        uuid : "333-333",
        vehicle : VehicleListMock[2],
        user : UserMock
    },
]

export default RequestListMock