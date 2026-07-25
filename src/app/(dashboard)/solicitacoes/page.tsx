import RequestList from "@/features/requests/components/RequestList";
import RequestListMock from "@/features/requests/mocks/RequestListMock";

export default function Requests () {
    return (
        <RequestList requests={RequestListMock}/>
    )
}