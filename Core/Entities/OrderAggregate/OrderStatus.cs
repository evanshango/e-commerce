using System.Runtime.Serialization;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "PENDING")]
        Pending,
        [EnumMember(Value = "PAYMENT RECEIVED")]
        PaymentReceived,
        [EnumMember(Value = "PAYMENT FAILED")]
        PaymentFailed
    }
}