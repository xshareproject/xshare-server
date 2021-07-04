import { Schema } from "mongoose";
import SHARE_PAYMENT_SERVICE from "./share/share.model";
import SQUARE_PAYMENT_SERVICE from "./square/square.model";

export enum PaymentType {
  share = "share",
  square = "square",
}

const paymentServiceSchema = new Schema({
  type: {
    type: PaymentType,
    required: true,
    default: PaymentType.share,
  },
  sharePayment: {
    type: SHARE_PAYMENT_SERVICE,
    required: false,
    default: null,
  },
  squarePayment: {
    type: SQUARE_PAYMENT_SERVICE,
    required: false,
    default: null,
  },
});

const PAYMENT_SERVICE = paymentServiceSchema;

export default PAYMENT_SERVICE;