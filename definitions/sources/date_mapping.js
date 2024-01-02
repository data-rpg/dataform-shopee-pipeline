function convert_to_local(date) {
  return `
    timestamp_add(timestamp_seconds(cast(${date} as int)), INTERVAL 8 hour)
  `;
}

module.exports = { convert_to_local };