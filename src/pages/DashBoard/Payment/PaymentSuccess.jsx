// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const PaymentSuccess = () => {
//     const [searchParams] = useSearchParams();
//     const [paymentInfo, setPaymentInfo] = useState({});
//     const sessionId = searchParams.get('session_id');
//     const axiosSecure = useAxiosSecure();

//     console.log(sessionId);

//     useEffect(() => {
//         if (sessionId) {
//             axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
//                 .then(res => {
//                     console.log(res.data)
//                     setPaymentInfo({
//                         transactionId: res.data.transactionId,
//                         trackingId : res.data.trackingId
//                     })
//                 })
//         }

//     }, [sessionId, axiosSecure])

//     return (
//         <div>
//             <h2 className="text-4xl">Payment successful</h2>
//             <p>Your TransactionId: {paymentInfo.transactionId}</p>
//             <p>Your Parcel Tracking id: {paymentInfo.trackingId}</p>
//         </div>
//     );
// };

// export default PaymentSuccess;


import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const called = useRef(false);

    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        if (!sessionId || called.current) return;
        called.current = true;

        axiosSecure
            .patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                setPaymentInfo(res.data);
                console.log(res.data);
            });
    }, [sessionId, axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-4xl font-bold text-green-600">
                ✅ Payment Successful
            </h2>

            <p className="mt-4">
                <strong>Transaction ID:</strong> {paymentInfo.transactionId}
            </p>

            <p>
                <strong>Session ID:</strong> {paymentInfo.sessionId}
            </p>

            <p>Transaction ID: {paymentInfo.transactionId}</p>
            <p>Tracking ID: {paymentInfo.trackingId}</p>

            {paymentInfo.paymentId && (
                <a
                    href={`http://localhost:3000/invoice/${paymentInfo.paymentId}`}
                    target="_blank"
                    className="btn btn-primary mt-4"
                >
                    Download Invoice (PDF)
                </a>
            )}

        </div>
    );
};

export default PaymentSuccess;
