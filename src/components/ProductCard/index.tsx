import { ProductType } from "./types"
import { FC } from 'react'
import styles from './productcard.module.css'
import { Button } from '@mui/material'
import { useRouter } from "next/navigation"

const ProductCard: FC<ProductType> = ({ _id,id, title, description, thumbnails, price, stock }) => {
    const { push } = useRouter()

    return (
        <div key={id} className={styles['card-outer-container']}>
            <div className={styles['card-inner-container']}>
                <div className={styles['product-image']}>
                    <img src={thumbnails[thumbnails.length - 1]} />
                </div>
                <div className={styles['product-card-information']}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.description}>
                        {description}
                    </div>

                    <div className={styles.stock}>
                        Disponibles: <p>{stock}</p>
                    </div>
                    <div className={styles.price}>
                        ${price}
                    </div>
                    <div>
                        <Button variant="contained" onClick={()=>push(`/product/${_id}`) }>
                            Ver mas
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard