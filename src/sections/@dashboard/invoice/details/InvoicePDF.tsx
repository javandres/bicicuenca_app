/* eslint-disable jsx-a11y/alt-text */

// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { IInvoice } from '../../../../@types/invoice';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

type Props = {
  invoice: IInvoice;
};

export default function InvoicePDF({ invoice }: Props) {
  const {
    items,
    taxes,
    status,
    dueDate,
    discount,
    invoiceTo,
    createDate,
    totalPrice,
    invoiceFrom,
    invoiceNumber,
    subTotalPrice,
  } = invoice;

  return <>...</>;
}
