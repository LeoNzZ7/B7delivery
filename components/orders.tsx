import Link from "next/link"
import { ArrowRight } from "phosphor-react"
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

  const date = new Date(data.ordersStatues.created_at as Date)

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
          {data.orders.status === "preparando" &&
            <span className="bg-[#FEFAE6] w-[78px] h-[26px] flex items-center justify-center text-[#D4BC34] text-[11px] font-semibold first-letter:uppercase rounded" >
              {data.orders.status}
            </span>
          }
          {data.orders.status === "enviado" &&
            <span className="bg-[#EDF1F8] w-[78px] h-[26px] flex items-center justify-center text-[#4F77BE] text-[11px] font-semibold first-letter:uppercase rounded" >
              {data.orders.status}
            </span>
          }
          {data.orders.status === "entregue" &&
            <span className="bg-[#F1F8F6] w-[78px] h-[26px] flex items-center justify-center text-[#6AB70A] text-[11px] font-semibold first-letter:uppercase rounded" >
              {data.orders.status}
            </span>
          }
          {data.orders.status === "cancelado" &&
            <span className="bg-[#F1D5DA] w-[78px] h-[26px] flex items-center justify-center text-[#C44D61] text-[11px] font-semibold first-letter:uppercase rounded" >
              {data.orders.status}
            </span>
          }
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
          <Link href={`/b7burger/orders/order/${data.orders.id}`}>
            <div style={{ borderColor: tenant?.mainColor }} className="flex items-center justify-center h-12 w-12 border rounded">
              <ArrowRight style={{ color: tenant?.mainColor }} size={24} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}