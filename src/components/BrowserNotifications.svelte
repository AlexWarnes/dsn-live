<script lang="ts">
	import { Button, MultiSelect, Tile } from 'carbon-components-svelte';
	import type { NotificationData, NotificationTrigger } from '../data/Models';
	import { spacecraftMap } from '../data/referenceData';
	import Add32 from 'carbon-icons-svelte/lib/Add32';
	import Delete16 from 'carbon-icons-svelte/lib/Delete16';
	import {
		hydrateNotificationData,
		renderSpacecraftText,
		renderStationAndDishText
	} from '../data/notification.service';

	import { onMount } from 'svelte';

	// import { browser } from "$app/env";
	import { notifications, notificationTriggers, permissionToNotify } from '../data/stores';
	import NotificationFormModal from './modals/NotificationFormModal.svelte';

	let showTriggerModal = false;
	onMount(() => {
		$permissionToNotify = readPermissionToNotify();
	});

	$: localStorage.setItem('notificationTriggers', JSON.stringify($notificationTriggers));

	// if(browser){
	//   if(!("Notification" in window)){
	//     // TODO: notifications are not supported
	//   }

	//   else if (Notification.permission === "granted"/* TODO: && $userNotifications.length */) {

	//   }

	function notificationsAreSupported(): boolean {
		return 'Notification' in window;
	}

	function readPermissionToNotify() {
		return window.Notification.permission;
	}

	function userHasNotifications(): boolean {
		return $notificationTriggers.length > 0;
	}

	function notifyUser(notification: NotificationData) {
		const options = {
			icon: '/assets/satellite_appleTouch_180x180.png',
			body: `${notification.spacecraft} | ${notification.dish} | ${notification.station}`,
			requireInteraction: true
		};
		if (window.Notification.permission === 'granted') {
			new Notification('Deep Space Network', options);
		} else if (window.Notification.permission !== 'denied') {
			window.Notification.requestPermission().then((p) => {
				if (p === 'granted') {
					new Notification('Deep Space Network', options);
				}
			});
		}
	}

	function requestPermission(): void {
		window.Notification.requestPermission().then((p) => {
			$permissionToNotify = p;
		});
	}

	// check if user has ntfx in localStorage
	// if so check permission status and $store for ref THEN request if needed
	// if not, $store for ref THEN do nothing
	// when ntfx created
	// if no permission, remind them
	// do nothing
	// }
	function deleteTrigger(id): void {
		notificationTriggers.update((current) => {
			return current.filter((trigger) => trigger.id !== id);
		});
		// localStorage.setItem("notificationTriggers", JSON.stringify($notificationTriggers));
	}

	$: for (let n of $notifications) {
		const nDetails = hydrateNotificationData(n);
		notifyUser(nDetails);
	}
</script>

<div class="notification-container">
	<h4 class="form-title">Notifications</h4>
	<!-- LIST OF TRIGGERS -->
	<div class="trigger-list">
		<ul>
			{#each $notificationTriggers as trigger (trigger.id)}
				<li class="trigger-row">
					<p class="trigger-text">
						Notify me when {renderSpacecraftText(trigger.spacecraft)} spacecraft {trigger.spacecraft
							.length > 1
							? 'are'
							: 'is'} targeted{renderStationAndDishText(trigger.stations, trigger.dishes)}.
					</p>
					<Button
						on:click={() => deleteTrigger(trigger.id)}
						iconDescription="Delete"
						tooltipPosition="left"
						tooltipAlignment="center"
						kind="danger-ghost"
						size="small"
						icon={Delete16}
					/>
				</li>
			{:else}
				<li class="trigger-row">You have not created any notification triggers.</li>
			{/each}
		</ul>
	</div>

	<Button on:click={() => (showTriggerModal = true)} icon={Add32}>New Trigger</Button>
</div>
<NotificationFormModal bind:open={showTriggerModal} />

<style>
	.notification-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		height: 100%;
	}

	.trigger-list {
		flex-grow: 1;
		overflow: auto;
		margin: 0 0 1.5rem;
		min-height: 3rem;
		max-height: 10rem;
	}
	.trigger-list * {
		font-size: 0.75rem;
	}

	.form-title {
		font-weight: 600;
		font-size: 1.25rem;
		margin: 1rem 0 0.5rem;
	}

	.trigger-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 300px;
		overflow: hidden;
		margin: 0.25rem 0;
		padding: 0.75rem;
		border: 1px solid #4589ff;
		background-color: #262626;
	}

	.trigger-text {
		flex-grow: 1;
		margin: 0 0.25rem 0 0;
	}
</style>
