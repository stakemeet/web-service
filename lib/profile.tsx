import { Button } from '@mui/material'
import { useConnect } from 'wagmi'
 
export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
 
  return (
    <div>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          color='secondary'
          variant='outlined'
          fullWidth
          onClick={() => connect({ connector })}
        >
          Connect with:
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </Button>
      ))}
 
      {error && <div>{error.message}</div>}
    </div>
  )
}