function convert_to_local(number){
    return `timestamp_add(timestamp_seconds(cast(safe_cast(${number} as numeric) as int64)), INTERVAL 8 hour)`;
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



module.exports = { convert_to_local, order_count, string_array_to_json };

