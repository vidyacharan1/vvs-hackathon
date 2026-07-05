# Arogyam AI Modules

Service boundaries for the AI layer.

## Planned Models

- Medicine forecasting: stock-outs, demand, expiry, consumption.
- Patient forecasting: OPD load, follow-up risk, village clusters.
- Disease prediction: outbreak risk, weather correlation, seasonal forecast.
- Doctor allocation: absence impact, workload balancing, transfer suggestions.
- Resource optimization: medicine redistribution, ambulance dispatch, bed pressure mitigation.
- Explainable AI: every recommendation includes evidence, confidence, and expected impact.
- Anomaly detection: sudden disease spikes, consumption anomalies, abnormal stock movement.

## API Integration

The FastAPI backend exposes `/api/v1/ai/*` endpoints. Model workers can later run as background jobs connected through Redis queues.
