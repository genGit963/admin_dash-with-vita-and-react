export interface Reservation {
    Id: number;
    Email: string;
    PhoneNumber: string;
    PickupDate: string;
    PickupTime: string;
    DropoffDate: string;
    DropoffTime: string;
    FirstName: string;
    LastName: string;
    PickupLocation: string;
    DropoffLocation: string;
    Price: number;
    Distance: number;
    PaymentCompleted: boolean;
    PaymentMethod: string;
    AgencyId: number;
    VehicleId: number;
    AgentId: number;
    CreatedOn: number;
    UpdatedOn: number;
}
