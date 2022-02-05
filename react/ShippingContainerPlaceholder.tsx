import React, { useEffect } from "react"

export default function ShippingContainerPlaceholder() {

    useEffect(() => {

       setTimeout(() => {
        const shippingElements = document.getElementsByClassName('vtex-address-form-4-x-input')

        console.log(shippingElements)

        if (shippingElements.length) {
            const shippingInput = shippingElements[0] as HTMLInputElement
            shippingInput.placeholder = 'Digite seu CEP'
        }
       }, 1500)

    }, [])

    return <span />
}