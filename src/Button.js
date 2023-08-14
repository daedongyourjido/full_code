import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
    return (
        <Stack spacing={2} direction="row">
            <Button variant="text" href="/profile">Profile</Button>
            <Button variant="text" href="/mymap">Mymap</Button>
        </Stack>
    );
}