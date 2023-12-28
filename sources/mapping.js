function date_utc_to_local(date) {
    return `
  timestamp_add(timestamp_seconds(safe_cast(${date} as int)), INTERVAL 8 hour)
  `
};
