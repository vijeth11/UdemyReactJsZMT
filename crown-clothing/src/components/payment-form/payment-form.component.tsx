import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Stripe, StripeCardElement, StripeElements } from "@stripe/stripe-js";
import { Component, FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { UserData } from "../../store/user/user.types";
import { withParams } from "../../utils/util/withParams.util";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './payment-from.styles.scss';

type PaymentFormProps = {
    amount?:number;
    currentUser?:UserData;
    elements?:StripeElements;
    stripe?:Stripe;
}

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

class PaymentForm extends Component<PaymentFormProps, {isProcessingPayment:boolean}>{

    amount: number = 0;
    currentUser: UserData | undefined;
    
    constructor(){
        super({});
        this.state = {
            isProcessingPayment:false
        }
    }

    componentDidMount(){
        this.amount = this.props.amount ?? 0;
        this.currentUser = this.props.currentUser;       
    }

    paymentHandler = async(event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({isProcessingPayment:true});
        if(!this.props.stripe || !this.props.elements){
            return;
        }
        const response = await fetch('/.netlify/functions/create-payment-intent',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({amount: this.amount * 100})
        }).then(res => res.json());
        const {client_secret} = response;
        const cartDetails = this.props.elements.getElement(CardElement)
        console.log(client_secret);

        if(!ifValidCardElement(cartDetails)) return;
        
        const paymentResult = await this.props.stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cartDetails,
                billing_details: {
                    name:this.currentUser ? this.currentUser.displayName : 'guest',
                    // bellow address is based on doc which is required according to 
                    address:{
                        line1:"510 Townsend St",
                        postal_code:"98140",
                        city:"San Francisco",
                        state:"CA",
                        country:"US"
                    }
                }
            }
        });
        
        if(paymentResult.error){
            console.log(paymentResult.error);
            alert(JSON.stringify(paymentResult.error));
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment success');
            }
        }
        this.setState({isProcessingPayment:false});
    }
    render(){
        return (
            <div className="payment-container">
                <form className="form-container" onSubmit={this.paymentHandler}>
                    <h2>Credit Card Payment:</h2>
                    <CardElement/>
                    <Button 
                        className="payment-button"
                        buttonType = {BUTTON_TYPE_CLASSES.inverted} 
                        isLoading={this.state.isProcessingPayment}>Pay now</Button>
                </form>
            </div>
        );
    }
}

export default withParams(PaymentForm, () => ({
    stripe: useStripe(), 
    elements: useElements(), 
    currentUser:useSelector(selectCurrentUser), 
    amount: useSelector(selectCartTotal)
}));