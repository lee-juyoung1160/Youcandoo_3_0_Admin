<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Event extends CI_Controller {

    public function lists()
        {
            $this->load->layout('event/event-list');
        }
    public function create()
        {
            $this->load->layout('event/event-create');
        }
    public function detail()
        {
            $this->load->layout('event/event-detail');
        }
    public function update()
        {
            $this->load->layout('event/event-update');
        }

}