import Link from "next/link"
import { ArrowRight } from "phosphor-react"
import { useState } from "react";
import { useAppContext } from "../contexts/app.content";
import { Order } from "../types/orders";
import { OrderStatus } from "../types/ordersStatues";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

type Props = {
  orders: Order
  ordersStatues: OrderStatus
};

export const OrdersComponent = (data: Props) => {
  const { tenant } = useAppContext();
  
  const [fullYear, setFullYear] = useState<Date>();
  const [hours, setHours] = useState<Date>();

  const date = new Date(data.ordersStatues.created_at)

  const orderDateFormatted = format(date, "' 'd'/'MM'/'yyyy' - ' k':'mm", {
    locale: ptBR,
  });

  return (
    <div className="px-5">
      <div className="h-[156px] w-full flex flex-col justify-center px-5 shadow-md shadow-[#999] mt-5 rounded">
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-semibold" >
            Pedido #{data.orders.id}
          </span>
          <span>
            {data.orders.status}
          </span>
        </div>
        <div>
          <span className="text-[#6A7D8B] text-[13px]" >
            {orderDateFormatted}
          </span>
        </div>
        <div className="flex justify-between items-center mt-5" >
          <div className="flex flex-col" >
            <span className="text-[13px] text-[#6A7D8B]">
              Total
            </span>
            <span className="text-[20px] font-semibold " style={{ color: tenant?.mainColor }}>{data.orders.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
          </div>
          <Link href={`/b7burger/`}>
            <div style={{ borderColor: tenant?.mainColor }} className="flex items-center justify-center h-12 w-12 border rounded">
              <ArrowRight style={{ color: tenant?.mainColor }} size={24} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}