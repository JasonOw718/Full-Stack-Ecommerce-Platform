import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethod } from "../../store/action";

function PaymentMethod() {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector((state) => state.payment);

  const paymentMethodHandler = (method) => {
    dispatch(updatePaymentMethod(method));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white border rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Select Payment Method
      </h1>
      <FormControl>
        <RadioGroup
          aria-label="payment method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => paymentMethodHandler(e.target.value)}
        >
          <FormControlLabel
            value="Stripe"
            control={<Radio color="primary" />}
            label="Stripe"
            className="text-gray-700 mb-2"
          />
          <FormControlLabel
            value="Paypal"
            control={<Radio color="primary" />}
            label="Paypal"
            className="text-gray-700"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default PaymentMethod;
