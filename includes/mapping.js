function convert_to_local(number){
    return `timestamp_add(timestamp_seconds(cast(safe_cast(${number} as numeric) as int64)), INTERVAL 8 hour)`;
}

function order_count(user, date){
    return `
    ROW_NUMBER() OVER(PARTITION BY (${user}) ORDER BY ${convert_to_local(date)})
    `;
}

module.exports = { convert_to_local, order_count };

