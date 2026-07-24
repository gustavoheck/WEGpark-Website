import { BaseWarning } from "./BaseWarning";
import { IllegalParking } from "./IllegalParking";
import { TrafficAccident } from "./TrafficAccident";

export type Occurrence = BaseWarning | IllegalParking | TrafficAccident