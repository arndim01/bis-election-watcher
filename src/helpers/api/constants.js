export const ValidateProps = {

    candidate_count: {
        brgy_id: { type: 'string' },
        part_id: { type: 'string' },
        prec_id: { type: 'string' },
        cand_id: { type: 'string' },
        type: { type: 'string' },
    },
    profile: {
        first_name: { type: 'string'},
        last_name: { type: 'string'},
        middle_name: { type: 'string'},
        mobile_number: { type: 'string'}
    },
    password: {
        oldpassword: { type: 'string'},
        newpassword: { type: 'string'}
    }
}