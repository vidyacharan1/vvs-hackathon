#!/bin/bash
NEW="https://gqvkvqhfwtsojtsjhcne.supabase.co"
echo "=== Checking NEW Supabase ==="
curl -s --connect-timeout 10 "$NEW" -o /dev/null -w "Root: %{http_code}\n"
curl -s --connect-timeout 10 "$NEW/rest/v1/" -o /dev/null -w "REST: %{http_code}\n"
curl -s --connect-timeout 10 "$NEW/auth/v1/" -o /dev/null -w "Auth: %{http_code}\n"
