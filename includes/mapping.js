function convert_to_local(number){
    return `format_timestamp("%FT%X", timestamp_add(timestamp_seconds(cast(safe_cast(${number} as numeric) as int64)), INTERVAL 8 hour))`;
}

function convert_to_local2(created_at){
    return `format_timestamp("%FT%X", timestamp_add(timestamp_seconds(cast(format_timestamp("%s",PARSE_TIMESTAMP("%Y-%m-%d %X %z" ,${created_at})) as int64)), INTERVAL 8 hour))`;
}

function convert_to_local3(created_dt){
    return `FORMAT_DATE('%Y-%m-%d', PARSE_DATE('%d %b %Y', ${created_dt}))`;
}

function order_count(user, date){
    return `
    ROW_NUMBER() OVER(PARTITION BY (${user}) ORDER BY ${convert_to_local(date)})
    `;
}

function string_array_to_json(stringified_array){ /* [{'A': 1, 'B': "Funfetti Knight's Tumbler", 'C': True}, {'A': 2, 'B': "Disney Ace Bottle Medium", 'C': False}] 
                                                     ==> [{"A": 1, "B": "Funfetti Knight's Tumbler", "C": true}, {"A": 2, "B": "Disney Ace Bottle Medium", "C": false}] */
    return `    
    PARSE_JSON(
    replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(${stringified_array}      
                                                                                                                , '"', "'")                                                                                                                                                      
                                                                                                                , "{'", '{"')
                                                                                                                , "':", '":')
                                                                                                                , ", '", ', "')
                                                                                                                , ": '", ': "')
                                                                                                                , "', ", '", ')
                                                                                                                , "'}", '"}')
                                                                                                                , ": [", ': "[')
                                                                                                                , "],", ']",')
                                                                                                                , "True", "true")
                                                                                                                , "False", "false")
                                                                                                                , "None", "null") 
               )                                                                                                                                                          
    `;
}

function get_new_fee_name(fee_name, transaction_type){
    return `
    case
        when ${fee_name} in ('Item Price Credit', 'Shipping Fee Subsidy (By Seller)', 'Shipping Fee Paid by Seller', 'Shipping Fee (Paid By Customer)', 'Shipping Fee Voucher (by Lazada)', 'Promotional Charges Vouchers', 'Lazcoin discount', 'LCP Fee', 'Promotional Charges Flexi-Combo', 'Free Shipping Max Fee', 'Payment Fee', 'Commission', 'Lazada Bonus', 'Lazada Bonus - LZD co-fund', 'Sponsored Affiliates') then fee_name
        when ${transaction_type} in ('Refunds-Sales', 'Refunds-Logistics', 'Refunds-Marketing Fees', 'Refunds-Lazada Fees', 'Refunds-Claims') then 'Refund'
        else 'Other' 
    end
    `;
}

function pivot_col_name(){
    return `
      (
        'orders_sales_item_price_credit',
        'orders_sales_other',
        'orders_logistics_shipping_fee_paid_by_seller',
        'orders_logistics_shipping_fee__paid_by_customer',
        'orders_logistics_shipping_fee_voucher__by_lazada',
        'orders_logistics_other',
        'orders_logistics_shipping_fee_subsidy__by_seller',
        'orders_marketing_fees_promotional_charges_vouchers',
        'orders_marketing_fees_free_shipping_max_fee',
        'orders_marketing_fees_lcp_fee',
        'orders_marketing_fees_promotional_charges_flexi_combo',
        'orders_marketing_fees_lazcoin_discount',
        'orders_marketing_fees_other',
        'orders_lazada_fees_payment_fee',
        'orders_lazada_fees_commission',
        'orders_lazada_fees_lazada_bonus',
        'orders_lazada_fees_lazada_bonus___lzd_co_fund',
        'orders_lazada_fees_other',
        'orders_claims_other',
        'other_services_marketing_fees_sponsored_affiliates',
        'other_services_marketing_fees_other',
        'refunds_sales_refund',
        'refunds_logistics_refund',
        'refunds_marketing_fees_refund',
        'refunds_lazada_fees_refund',
        'refunds_claims_refund'
      )
    `;
}


module.exports = {  
                    convert_to_local, 
                    convert_to_local2, 
                    convert_to_local3, 
                    order_count, 
                    string_array_to_json, 
                    get_new_fee_name, 
                    pivot_col_name 
                 };

