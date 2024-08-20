import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { MapPinLine, CurrencyDollar } from "phosphor-react";
import { useCoffee } from "../../hooks/useCoffee";
import { PaymentSelect, TSelectPayment } from "../../components/PaymentSelect";
import {
  CheckoutAddress,
  CheckoutCardHeader,
  CheckoutEmptyList,
  CheckoutDetails,
} from "./components";
import {
  CardContainer,
  CheckoutContainer,
  CoffeeCardContainer,
  LeftSection,
  RightSection,
  PaymentSelectContent,
  Title,
} from "./styles";

// Define the Yup validation schema
const schema = yup.object().shape({
  cep: yup.string().required("CEP obrigatório"),
  rua: yup.string().required("Rua obrigatória"),
  numero: yup.string().required("Número obrigatório"),
  complemento: yup.string().optional(),
  bairro: yup.string().required("Bairro obrigatório"),
  cidade: yup.string().required("Cidade obrigatória"),
  uf: yup.string().required("UF obrigatório"),
});

export type TAddress = yup.InferType<typeof schema>;

export type TFormData = TAddress;

export function Checkout() {
  const navigate = useNavigate();
  const { coffeeList, handleCheckout } = useCoffee();
  const [selectedPayment, setSelectedPayment] = useState<TSelectPayment | null>(
    null
  );

  const coffeeListIsEmpty = coffeeList && coffeeList.length > 0;

  const methods = useForm<TFormData>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  function handleSelectPayment(paymentType: TSelectPayment) {
    setSelectedPayment(paymentType);
  }

  function onSubmit(data: TAddress) {
    if (!selectedPayment) {
      alert("Selecione uma forma de pagamento");
      return;
    }

    handleCheckout({
      address: data,
      paymentMethod: selectedPayment,
    });

    navigate("/success");
  }

  const creditSelected = selectedPayment === "credit";
  const debitSelected = selectedPayment === "debit";
  const moneySelected = selectedPayment === "money";

  return (
    <CheckoutContainer onSubmit={handleSubmit(onSubmit)}>
      <RightSection>
        <Title>Complete seu pedido</Title>

        <CardContainer>
          <CheckoutCardHeader
            title="Endereço de entrega"
            subtitle="Informe seu endereço para que possamos entregar seu pedido"
            icon={{
              component: <MapPinLine size={24} />,
              color: "yellow",
            }}
          />

          <FormProvider {...methods}>
            <CheckoutAddress />
          </FormProvider>
        </CardContainer>

        <CardContainer>
          <CheckoutCardHeader
            title="Pagamento"
            subtitle="O pagamento é feito na entrega. Escolha a forma que deseja pagar"
            icon={{
              component: <CurrencyDollar size={24} />,
              color: "purple",
            }}
          />

          <PaymentSelectContent>
            <PaymentSelect
              type="credit"
              onSelect={handleSelectPayment}
              isSelected={creditSelected}
            />
            <PaymentSelect
              type="debit"
              onSelect={handleSelectPayment}
              isSelected={debitSelected}
            />
            <PaymentSelect
              type="money"
              onSelect={handleSelectPayment}
              isSelected={moneySelected}
            />
          </PaymentSelectContent>
        </CardContainer>
      </RightSection>

      <LeftSection>
        <Title>Cafés selecionados</Title>

        <CoffeeCardContainer>
          {coffeeListIsEmpty ? <CheckoutDetails /> : <CheckoutEmptyList />}
        </CoffeeCardContainer>
      </LeftSection>
    </CheckoutContainer>
  );
}
