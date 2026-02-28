/**
 * Formats a Turkish phone number as user types
 * Accepts: 5321234567, 05321234567, +905321234567
 * Returns: 0532 123 45 67
 */
export function formatPhoneNumber(value) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');

    // Remove leading country code if present (90)
    let cleaned = digits;
    if (cleaned.startsWith('90') && cleaned.length > 10) {
        cleaned = cleaned.substring(2);
    }

    // Ensure it starts with 0
    if (cleaned.length > 0 && !cleaned.startsWith('0')) {
        cleaned = '0' + cleaned;
    }

    // Limit to 11 digits (0 + 10 digits)
    cleaned = cleaned.substring(0, 11);

    // Format: 0XXX XXX XX XX
    if (cleaned.length <= 4) {
        return cleaned;
    } else if (cleaned.length <= 7) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    } else if (cleaned.length <= 9) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
    }
}

/**
 * Extracts only digits from formatted phone number for API submission
 * Input: 0532 123 45 67
 * Output: 05321234567
 */
export function getPhoneDigits(formattedPhone) {
    return formattedPhone.replace(/\D/g, '');
}

/**
 * Validates Turkish phone number
 * Must be 11 digits starting with 0
 */
export function isValidPhoneNumber(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('0');
}
